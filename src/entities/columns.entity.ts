import { ApiProperty } from '@nestjs/swagger';
import { CreateColumnDto } from 'src/dtos';
import { UserEntity } from 'src/entities/users.entity';
import { Columns } from 'src/models';
import { CardEntity } from './cards.entities';


export class ColumnEntity {
  constructor(column: CreateColumnDto) {
    this.author.id = +column.authorID ;
	this.content = column.content;
}
  @ApiProperty({
    example: 1,
    description: `Column's ID`,
  })
  id: string;
  @ApiProperty({
    description: 'The Author - owner',
	type: UserEntity
  })
  author: Partial<UserEntity>;

  @ApiProperty({
    example: 'Some content',
    description: "Column' content",
	type: String
  })
  content: string;

  @ApiProperty({
    description: `Cards at column`,
	type: CardEntity
  })
  cards: Partial<CardEntity[]>;
}
