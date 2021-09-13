import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cards, Comments, Users } from '../entities';
import { CreateCardDto, UpdateCardDto } from '../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Cards)
		private cardRepository: Repository<Cards>,
  ) {}

  async create(columnID, createCardDto: CreateCardDto) {
    const card = new Cards();
    card.content = createCardDto.content;
		return await this.cardRepository.save(card);
  }

  async findOne(id) {
    const res = await this.cardRepository.findOne(id);
    if (res) {
      return res;
    } else throw new NotFoundException(`Card don't exists`);
  }

  async findAll(column_id: string) {
    return await this.cardRepository.find();
  }

  async findAllByAuthorId(authorID: string, columnID: string) {
    return await this.cardRepository.find();
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const model = await this.cardRepository.findOne(id);
    if (model) {
      // return await model.update();
    } else throw new NotFoundException(`Comment don't exists`);
  }

  async remove(id: string) {
    const res = await this.cardRepository.delete(id);
    if (res) return true;
    else return false;
  }
}
