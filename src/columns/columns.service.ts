import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Columns } from './columns.model';
import { Users } from 'src/users/users.model';
import { CreateColumnDto } from './dto/create-column.tdo';
import { UsersService } from 'src/users/users.service';
import { UpdateColumnDto } from './dto/update-column.tdo';
import { Column } from './entities/columns.entity';
@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Columns)
    private readonly columnModel: typeof Columns,
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
    return await this.columnModel.findAll();
  }

  async getAllByAuthor(authorID: string): Promise<Columns[] | any> {
    return await this.columnModel.findAll({
      where: {
        user_id: authorID,
      },
    });
  }

  async findOne(id: string): Promise<Columns | any> {
    return await this.columnModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateColumnDto: UpdateColumnDto): Promise<Columns> {
    await this.columnModel.update(
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
    return await this.columnModel.destroy({
      where: {
        user_id,
        id,
      },
    });
  }
}
