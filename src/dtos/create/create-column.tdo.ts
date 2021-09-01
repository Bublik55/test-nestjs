import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({
    description: `This is Author's ID`,
  })
  @IsNumber()
  @IsNotEmpty()
  authorID: number;

  @ApiProperty({
    description: `Column's content`,
  })
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
