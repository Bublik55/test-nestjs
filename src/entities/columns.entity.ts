import { ApiProperty } from '@nestjs/swagger';
import { CreateColumnDto } from 'src/dtos';
import { UserEntity } from 'src/entities/users.entity';
import { CardEntity } from './cards.entities';

export class ColumnEntity {
  constructor(column: CreateColumnDto) {
    this.author = { id: column.author.id };
	this.content = column.content;
  }

  @ApiProperty({
    description: 'The Author - owner',
  })
  author: Partial<UserEntity>;

  @ApiProperty({
    example: 'Some content',
    description: "Column' content",
  })
  content: string;

  @ApiProperty({
    description: `Cards on column`,
  })
  cards: Partial<CardEntity[]>;
}
