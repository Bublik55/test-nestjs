import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({
    description: `This is Author's ID`,
  })
  @IsNumberString()
  @IsNotEmpty()
  authorID: string;

  @ApiProperty({
    description: `Column's content`,
  })
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
