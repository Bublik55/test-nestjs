import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cards } from '../models/cards.model';
import { CreateCardDto, UpdateCardDto } from '../dtos';
@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Cards)
    private readonly cardsModel: typeof Cards,
  ) {}

  async create(columnID: number, createCardDto: CreateCardDto): Promise<Cards> {
    const card = new Cards();
    card.content = createCardDto.content;
    card.author_id = createCardDto.author.id;
    card.column_id = columnID;
    return await card.save();
  }

  async findOne(id): Promise<Cards> {
    return await this.cardsModel.findOne({
      where: { id },
    });
  }

  async findAll(column_id: string): Promise<Cards[]> {
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
    });
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    return await this.cardsModel.update(
      {
        content: updateCardDto.content,
      },
      {
        where: { id },
      },
    );
  }

  async remove(id: string) {
    return await this.cardsModel.destroy({ where: { id } });
  }
}
