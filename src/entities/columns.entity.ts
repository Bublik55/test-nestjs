import { ApiProperty } from '@nestjs/swagger';
import { CreateColumnDto } from 'src/dtos';
import { Users } from 'src/entities/users.entity';
import { Cards } from './cards.entities';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Columns {


  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: `Column's ID`,
  })
  id: string;

	@ApiProperty({
		example: 'Some content',
		description: "Column' content",
		type: String,
	})
	@Column()
	content: string;

  @ApiProperty({
    description: 'The Author - owner',
    type: Users,
  })
  @ManyToOne(() => Users, (author) => author.columns)
  author: Users;


  @ApiProperty({
    description: `Cards at column`,
    type: Cards,
  })
  @ManyToOne(() => Cards)
  cards: Partial<Cards[]>;
}
