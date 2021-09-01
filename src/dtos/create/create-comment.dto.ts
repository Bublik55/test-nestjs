import { IsString, IsEmail, IsNotEmpty, MinLength, IsNumber, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCommentDto {
  @ApiProperty({description: `Author's ID`, type: Number})
  @IsNotEmpty()
  @IsNumberString()
  readonly authorID: string;

  @ApiProperty({description: `Card's content`, type: String})
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
