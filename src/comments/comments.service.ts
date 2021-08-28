import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cards } from 'src/cards/cards.model';
import { Comments } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments)
    private readonly commentsModel: typeof Comments,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = new Comments();
    comment.author_id = createCommentDto.author_id;
    comment.card_id = createCommentDto.card_id;
    comment.content = createCommentDto.content;
    return await comment.save();
  }

  async findAll(card_id: string) {
    return await this.commentsModel.findAll({ where: { card_id } });
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
