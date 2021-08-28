import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly author_id: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly card_id: string;

  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  readonly content: string;
}
