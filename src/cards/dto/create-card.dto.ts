import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @IsString()
  @ApiProperty({
    description: `The author's ID`,
  })
  user_id: string;

  @IsString()
  @ApiProperty({
    description: `The column's ID`,
  })
  column_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Column's content`,
    example: 'Some awesome content',
  })
  content: string;
}
