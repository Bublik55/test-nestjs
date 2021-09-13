import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateColumnDto, UpdateColumnDto } from '../dtos';
import { Columns, Users } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Columns)
    private columnRepository:  Repository<Columns>,
  ) {}

  async create(createColumnDto: CreateColumnDto) {
    const column = new Columns();
    column.content = createColumnDto.content;
    return await this.columnRepository.save(column);
  }

  async getAll() {
    return await this.columnRepository.find();
  }

  async findAllByAuthor(authorID: string) {
    return await this.columnRepository.find();
  }

  async findOne(id: string) {
    return await this.columnRepository.findOne(id);
  }

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    const model = await this.columnRepository.findOne(id);
    if (model) {
      return await model;
          } else throw new NotFoundException('Column not found');
  }

  async remove(id: string) {
    return await this.columnRepository.delete(id);
  }
}
