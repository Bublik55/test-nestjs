import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cards, Users, Comments } from 'src/models/';
import { CreateCommentDto, UpdateCommentDto } from '../dtos';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments)
    private readonly commentsModel: typeof Comments,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = new Comments();
    comment.author_id = createCommentDto.authorID;
    comment.card_id = createCommentDto.cardID;
    comment.content = createCommentDto.content;
    return await comment.save();
  }

  async findAll(card_id: string) {
    console.log(card_id);
    return await this.commentsModel.findAll({
      where: { card_id },
      include: { model: Users },
    });
  }

  async findOne(id: string) {
    const res = await this.commentsModel.findOne({
      where: { id },
      include: { model: Users },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException(`Comment not exists`);
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const model = await this.findOne(id);
    if (model) {
      return await model.update(
        {
          content: updateCommentDto.content,
        },
        { where: { id } },
      );
    } else throw new NotFoundException(`Comment don't exists`);
  }

  async remove(id: string) {
    const res = await this.commentsModel.destroy({ where: { id } });
    if (res) return true;
    else return false;
  }
}
