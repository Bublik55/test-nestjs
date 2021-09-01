import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateColumnDto, UpdateColumnDto } from '../dtos';
import { Columns, Users } from 'src/models';
@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Columns)
    private readonly columnsModel: typeof Columns,
  ) {}

  async create(createColumnDto: CreateColumnDto) {
    const column = new Columns();
    column.content = createColumnDto.content;
    column.author_id = +createColumnDto.authorID;
    return await column.save();
  }

  async getAll() {
    return await this.columnsModel.findAll({ include: { model: Users } });
  }

  async findAllByAuthor(authorID: string) {
    return await this.columnsModel.findAll({
      where: {
        author_id: authorID,
      },
      include: {
        model: Users,
      },
    });
  }

  async findOne(id: string) {
    return await this.columnsModel.findOne({
      where: {
        id,
      },
      include: { model: Users },
    });
  }

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    const model = await this.columnsModel.findOne({ where: { id } });
    if (model) {
      return await model
        .update(
          {
            content: updateColumnDto.content,
          },
          {
            where: { id },
          },
        )
        .then();
    } else throw new NotFoundException('Column not found');
  }

  async remove(id: string) {
    return await this.columnsModel.destroy({
      where: { id },
    });
  }
}
