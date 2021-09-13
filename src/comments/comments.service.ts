import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectRepository } from '@nestjs/typeorm';
import { Cards, Users, Comments } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from '../dtos';

@Injectable()
export class CommentsService {
  constructor(
		@InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  async create(cardId : string,createCommentDto: CreateCommentDto) {
    const comment = new Comments();
    // comment.author_id = +createCommentDto.authorID;
    // comment. = +cardId;
    comment.content = createCommentDto.content;
    return await this.commentRepository.save(comment);
  }

  async findAll(card_id: string) {
    return await this.commentRepository.find();
  }

  async findOne(id: string) {
    const res = await this.commentRepository.findOne(id);
    if (res) {
      return res;
    } else {
      throw new NotFoundException(`Comment not exists`);
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const model = await this.findOne(id);
    if (model) {
      return await model;
    } else throw new NotFoundException(`Comment don't exists`);
  }

  async remove(id: string) {
    const res = await this.commentRepository.delete(id);
    if (res) return true;
    else return false;
  }
}
