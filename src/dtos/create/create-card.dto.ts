import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/users.entity';
import { ColumnEntity } from 'src/entities/columns.entity';

export class CreateCardDto {
  @ApiProperty({
    description: `The author's ID`,
	type: String
  })
  authorID: number;

  @ApiProperty({
    description: `The column to attach card`,
	type: String
  })
  columnID: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Column's content`,
    example: `Some awesome card's content`,
  })
  content: string;
}
