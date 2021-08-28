import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/users/entities/users.entity';

export class Card {

	@ApiProperty({
		example: new Users(),
		description: `The Author - owner`
	})
	author: Users;

	@ApiProperty({
		example: `Some card\'s contetnt`,
		description: `The content of the card`
	})
	content: string;
}