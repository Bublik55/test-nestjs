import { ApiProperty } from '@nestjs/swagger';
import { ManyToOne, PrimaryGeneratedColumn,Column, Entity } from 'typeorm';
import { Comments, Users } from './';


@Entity()
export class Cards {

  @ApiProperty({
    example: 1,
    description: `The Card's ID`,
  })
	@PrimaryGeneratedColumn()
  id: string;

	
  @ApiProperty({
		example: `Some card\'s contetnt`,
    description: `The content of the card`,
    type: String,
  })
  @Column()
	content: string;

	// @ApiProperty({
	// 	description: `The Author - owner`,
	// 	type: Users,
	// })
	// @ManyToOne(()=> Users)
	// author: Users;
	
  @ApiProperty({
		description: `These are comments`,
    type: [Comments],
  })
	@ManyToOne(()=> Cards)
  comments: Comments[];
}
