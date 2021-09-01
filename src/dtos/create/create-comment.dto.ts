import { IsString, IsEmail, IsNotEmpty, MinLength, IsNumber, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCommentDto {
  @ApiProperty({description: `Author's ID`, type: Number})
  @IsNotEmpty()
  @IsNumber()
  readonly authorID: number;

  @ApiProperty({description: `Cards's ID to attach comment`, type: Number})
  @IsNumber()
  @IsNotEmpty()
  readonly cardID: number;

  @ApiProperty({description: `Card's content`, type: String})
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
