import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Comments } from '../models/comments.model';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from '../dtos';

@Controller('comments')
@ApiTags ()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

	@Post()
	create (@Body() createCommentDto: CreateCommentDto): Promise<Comments> {
		const comment = new Comments();

		comment.content = createCommentDto.content;
		return this.commentsService.create(comment);
	}

	@Get()
	findAll(@Param(`cardid`) card_id: string){
		return this.commentsService.findAll(card_id);
	}

	@Get()
	findOne(@Param(`id`) id: string) {
		return this.commentsService.findOne(id);
	}

	@Patch(`:id`)
	update(@Param(`id`) id:string, @Body() updateCommentDto:UpdateCommentDto){
		return this.commentsService.update(id, updateCommentDto);
	}

	@Delete(`:id`)
	remove(@Param(`id`) id: string){
		return	this.commentsService.remove(id);
	}
}
