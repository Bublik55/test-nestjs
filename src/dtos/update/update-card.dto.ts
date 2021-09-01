import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateCardDto } from '../create/create-card.dto';

export class UpdateCardDto extends PartialType(
  OmitType(CreateCardDto, [`authorID`] as const),
) {}
