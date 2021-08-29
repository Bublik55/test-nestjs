import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateColumnDto, UpdateColumnDto } from '../dtos';
import { Columns, Users } from 'src/models';
import { stringify } from 'querystring';
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
    column.author_id = authorID;
    /* Очень плохая идея */
    const res = await column.save();
    return await this.findOne(res.id.toString());
  }

  async getAll(): Promise<Columns[]> {
    return await this.columnsModel.findAll({ include: { model: Users } });
  }

  async findAllByAuthor(authorID: string): Promise<Columns[] | any> {
    return await this.columnsModel.findAll({
      where: {
        author_id: authorID,
      },
      /* 
	  Неизвестно, нужно ли возвращать ползователя, 
	  когда возвращаем  колонки.
	  Возможно, стоит поискать реализацию LAZY
	  */
      include: {
        model: Users,
      },
    });
  }

  async findOne(id: string): Promise<Columns | any> {
    return await this.columnsModel.findOne({
      where: {
        id,
      },
      include: { model: Users },
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
    return await this.columnsModel.findOne({ where: { id }, include: Users });
  }

  async remove(user_id: string, id: string): Promise<any> {
    return await this.columnsModel.destroy({
      where: {
        author_id: user_id,
        id,
      },
    });
  }
}
