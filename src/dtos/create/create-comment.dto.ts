import { IsString, IsEmail, IsNotEmpty, MinLength, IsNumber, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly authorID: number;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  readonly cardID: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
