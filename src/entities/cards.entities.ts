import { ApiProperty } from '@nestjs/swagger';
import { CreateCardDto, CreateCommentDto } from 'src/dtos';
import { UserEntity } from 'src/entities/users.entity';
import { CommentEntity } from './comment.entity';

export class CardEntity {
	constructor(card: CreateCardDto) {
		this.content = card.content;
		this.author = {id : card.author.id};
	}
  @ApiProperty({
    example: 1,
    description: `The Card's ID`,
  })
  id: number;

  @ApiProperty({
    description: `The Author - owner`,
	type: UserEntity
  })
  author: Partial<UserEntity>;

  @ApiProperty({
    example: `Some card\'s contetnt`,
    description: `The content of the card`,
	type: String
  })
  content: string;

  @ApiProperty({
    description: `These are comments`,
	type: [CommentEntity]
  })
  comments: Partial<CommentEntity[]>;
}
