import { ApiProperty } from '@nestjs/swagger';
import { CreateCardDto } from 'src/dtos';
import { CommentEntity, UserEntity } from './';

export class CardEntity {
  constructor(card: CreateCardDto) {
    this.content = card.content;
    this.author.id = card.authorID;
  }
  @ApiProperty({
    example: 1,
    description: `The Card's ID`,
  })
  id: number;

  @ApiProperty({
    description: `The Author - owner`,
    type: UserEntity,
  })
  author: Partial<UserEntity>;

  @ApiProperty({
    example: `Some card\'s contetnt`,
    description: `The content of the card`,
    type: String,
  })
  content: string;

  @ApiProperty({
    description: `These are comments`,
    type: [CommentEntity],
  })
  comments: Partial<CommentEntity[]>;
}
