import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/users/entities/users.entity';

export class Column {

	@ApiProperty({
		example: new Users(),
		description: 'The user\'s name'
	})
	Author: Users;

	@ApiProperty({
		example: 'Some content',
		description: 'Column\' content'
	})
	content: string;
}
