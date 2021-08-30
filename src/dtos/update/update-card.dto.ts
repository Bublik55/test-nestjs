import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { CreateCardDto } from '../create/create-card.dto';

export class UpdateCardDto extends PartialType(
  OmitType(CreateCardDto, [`author`, `column_id`] as const),
) {}
