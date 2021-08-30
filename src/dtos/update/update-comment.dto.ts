import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from '../';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
