import { IsString, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCardDto {
  @ApiProperty({
    description: `The author's ID`,
	type: Number
  })  
  @IsNotEmpty()
  @IsNumber()
  authorID: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Column's content`,
    example: `Some awesome card's content`,
	type: String
  })
  content: string;
}
