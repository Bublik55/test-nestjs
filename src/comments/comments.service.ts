import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cards } from 'src/models/cards.model';
import { Comments } from '../models/comments.model';
import { CreateCommentDto, UpdateCommentDto } from '../dtos';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments)
    private readonly commentsModel: typeof Comments,
  ) {}

  async create(Comments) {
    const comment = new Comments();
    return await comment.save();
  }

  async findAll(card_id: string) {
	  console.log(card_id);
    return await this.commentsModel.findAll({ where: { card_id: card_id } });
  }

  async findOne(id: string) {
    return await this.commentsModel.findOne({ where: { id } });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.commentsModel.update(
      {
        content: updateCommentDto.content,
      },
      { where: { id } },
    );
  }

  async remove(id: string) {
    return await this.commentsModel.destroy({ where: { id } });
  }
}
