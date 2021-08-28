import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/users/entities/users.entity';

export class Column {

	@ApiProperty({
		example: new Users(),
		description: 'The Author - owner'
	})
	author: Users;

	@ApiProperty({
		example: 'Some content',
		description: 'Column\' content'
	})
	content: string;
}
