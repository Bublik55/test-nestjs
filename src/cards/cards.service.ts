import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cards, Comments, Users } from '../models';
import { CreateCardDto, UpdateCardDto } from '../dtos';
import { Model } from 'sequelize';
import { UserEntity } from 'src/entities';
@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Cards)
    private readonly cardsModel: typeof Cards,
  ) {}

  async create(columnID, createCardDto: CreateCardDto) {
    const card = new Cards();
    card.content = createCardDto.content;
    card.author_id = createCardDto.authorID;
    card.column_id = columnID;
    return await card.save();
  }

  async findOne(id) {
    const res = await this.cardsModel.findOne({
      where: { id },
      include: [{ model: Comments }, { model: Users }],
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException(`Comment not exists`);
    }
  }

  async findAll(column_id: string) {
    return await this.cardsModel.findAll({
      where: { column_id },
    });
  }

  async findAllByAuthorId(authorID: string, columnID: string) {
    return await this.cardsModel.findAll({
      where: {
        column_id: columnID,
        author_id: authorID,
      },
      include: { model: Users },
    });
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const model = await this.findOne(id);
    if (model) {
      return await model.update(
        {
          content: updateCardDto.content,
        },
        { where: { id } },
      );
    } else throw new NotFoundException(`Comment don't exists`);
  }

  async remove(id: string) {
    const res = await this.cardsModel.destroy({ where: { id } });
    if (res) return true;
    else return false;
  }
}
