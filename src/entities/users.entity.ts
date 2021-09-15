import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos';
import { Columns } from './columns.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cards, Comments } from '.';

@ApiTags(`Entities`)
@Entity()
export class Users {

  @ApiProperty({
    example: 1,
    description: `User's ID`,
  })
	@PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Boby',
    description: "The user's name",
    type: String,
  })
	@Column({ unique: true})
  name: string;

  @ApiProperty({
    example: 'Pa$$word',
    description: "The user's password",
    type: String,
  })
	@Column()
  password: string;

  @ApiProperty({
    example: 'email@gmail.com',
    description: "The user's mail",
  })
	@Column({ unique: true})
  email: string;

  @ApiProperty({
    description: `The user's Columns`,
    type: Columns,
  })
	@OneToMany(() => Columns, columns => columns.author )
  columns: Columns[];

	@OneToMany(() => Comments, comments => comments.commenter)
	comments: Comments[];

	@OneToMany(() => Cards, cards => cards.cardowner)
	cards: Cards[];
}
