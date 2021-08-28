import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Columns } from './columns.model';
import { CreateColumnDto } from './dto/create-column.tdo';
import { UpdateColumnDto } from './dto/update-column.tdo';
@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Columns)
    private readonly columnsModel: typeof Columns,
  ) {}

  async create(
    authorID: string,
    createColumnDto: CreateColumnDto,
  ): Promise<Columns> {
    const column = new Columns();
    column.content = createColumnDto.content;
    column.user_id = authorID;
    return await column.save();
  }

  async getAll(): Promise<Columns[]> {
    return await this.columnsModel.findAll();
  }

  async findAllByAuthor(authorID: string): Promise<Columns[] | any> {
    return await this.columnsModel.findAll({
      where: {
        user_id: authorID,
      },
    });
  }

  async findOne(id: string): Promise<Columns | any> {
    return await this.columnsModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateColumnDto: UpdateColumnDto): Promise<Columns> {
    await this.columnsModel.update(
      {
        content: updateColumnDto.content,
      },
      {
        where: { id },
      },
    );
    return await this.findOne(id);
  }

  async remove(user_id: string, id: string): Promise<any> {
    return await this.columnsModel.destroy({
      where: {
        user_id,
        id,
      },
    });
  }
}
