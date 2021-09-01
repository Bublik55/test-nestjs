import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from '../dtos';
import { CommentOwnerGuard } from 'src/utils/auth/guards/owner.guards/comment.owner.guard';
import { CommentEntity } from 'src/entities';

@ApiBearerAuth()
@ApiTags(`comments`)
@Controller('/cards/:cardid/comments/')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({
    summary: `Create Comment`,
	description: `Author and card not validated`
  })
  @ApiResponse({
    status: 201,
    description: `Comment created`,
  })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({
    summary: `Get all Comments`,
	description: `Get all Card's comments`
  })
  @ApiResponse({
    status: 200,
    type: [CommentEntity],
  })
  findAll(@Param(`cardid`, ParseIntPipe) card_id: string) {
    console.log(card_id);
    return this.commentsService.findAll(card_id);
  }

  @Get(`:id`)
  @ApiOperation({
    summary: `Get Comment by ID`,
  })
  @ApiResponse({
    status: 200,
    description: `Get Card's Comment`,
    type: CommentEntity,
  })
  findOne(@Param(`id`, ParseIntPipe) id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(`:id`)
  @ApiOperation({
    summary: `Update Comment`,
  })
  @ApiResponse({
    status: 200,
    description: `Success operation`,
    type: CommentEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @UseGuards(CommentOwnerGuard)
  update(
    @Param(`id`, ParseIntPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(`:id`)
  @ApiOperation({
    summary: `Delete Comment`,
  })
  @ApiResponse({
    status: 200,
    description: `Success operation`,
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @UseGuards(CommentOwnerGuard)
  remove(@Param(`id`, ParseIntPipe) id: string) {
    return this.commentsService.remove(id);
  }
}
