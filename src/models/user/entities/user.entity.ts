import { ApiProperty } from '@nestjs/swagger';

export class User {

	@ApiProperty({
		example: 'Boby',
		description: 'The user\'s name'
	})
	name: string;

	@ApiProperty({
		example: 'Pa$$word',
		description: 'The user\'s password'
	})
	password: string;

	@ApiProperty({
		example: 'email@gmail.com',
		description: 'The user\'s mail'
	})
	email: string;
}
