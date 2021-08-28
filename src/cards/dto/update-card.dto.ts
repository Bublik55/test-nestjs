import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { CreateColumnDto } from 'src/columns/dto/create-column.tdo';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(
  OmitType(CreateCardDto, [`user_id`, `column_id`] as const),
) {}
