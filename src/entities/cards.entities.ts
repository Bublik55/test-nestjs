import { ApiProperty } from '@nestjs/swagger';
import { CreateCardDto, CreateCommentDto } from 'src/dtos';
import { UserEntity } from 'src/entities/users.entity';
import { CommentEntity } from './comment.entity';

export class CardEntity {
	constructor(card: CreateCardDto){
		this.author = {id: card.author.id}
		this.content = card.content;
	}
	@ApiProperty({
		description: `The Author - owner`
	})
	author: Partial<UserEntity>;

	@ApiProperty({
		example: `Some card\'s contetnt`,
		description: `The content of the card`
	})
	content: string;

	@ApiProperty({
		description: `These are comments`
	})
	comments: Partial<CommentEntity[]>
}