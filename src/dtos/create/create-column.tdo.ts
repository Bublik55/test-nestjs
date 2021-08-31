import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({
    description: `This is Author\'s ID`,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly authorID: number;

  @ApiProperty({
    description: `Column's content`,
    example: 'Some awesome content',
  })
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
