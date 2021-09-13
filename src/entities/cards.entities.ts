import { ApiProperty } from '@nestjs/swagger';
import { CreateCardDto } from 'src/dtos';
import { ManyToOne, PrimaryGeneratedColumn,Column, Entity } from 'typeorm';
import { Comment, User } from './';


@Entity()
export class Cards {
  constructor(card: CreateCardDto) {
    this.content = card.content;
    this.author.id = card.authorID;
  }
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

	@ApiProperty({
		description: `The Author - owner`,
		type: User,
	})
	@ManyToOne(()=> User)
	author: User;
	
  @ApiProperty({
		description: `These are comments`,
    type: [Comment],
  })
	@ManyToOne(()=> Cards)
  comments: Comment[];
}
