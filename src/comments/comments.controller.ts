import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Comments } from '../models/comments.model';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from '../dtos';

@Controller('users/{userid}/columns/{columnid}/cards/{cardid}/comments/')
@ApiTags (`comments`)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

	@Post()
	@ApiOperation({
		summary: `Create Comment`
	})
	create (@Body() createCommentDto: CreateCommentDto) {
		return this.commentsService.create(createCommentDto);
	}

	@Get()
	@ApiOperation({
		summary: `Get all Comments`
	})
	findAll(@Param(`cardid`) card_id: string){
		console.log(card_id);
		return this.commentsService.findAll(card_id);
	}

	@Get(`:id`)
	@ApiOperation({
		summary: `Get Comment by ID`
	})
	findOne(@Param(`id`) id: string) {
		return this.commentsService.findOne(id);
	}

	@Patch(`:id`)
	@ApiOperation({
		summary: `Update Comment`
	})
	update(@Param(`id`) id:string, @Body() updateCommentDto:UpdateCommentDto){
		return this.commentsService.update(id, updateCommentDto);
	}

	@Delete(`:id`)
	@ApiOperation({
		summary: `Delete Comment`
	})
	remove(@Param(`id`) id: string){
		return	this.commentsService.remove(id);
	}
}
