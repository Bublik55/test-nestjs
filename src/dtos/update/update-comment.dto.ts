import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateCommentDto } from '../';

export class UpdateCommentDto extends PartialType(
	OmitType(CreateCommentDto, [`authorID`] as const)
  ) {}