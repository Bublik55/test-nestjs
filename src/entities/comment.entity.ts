import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/dtos';
import { Users } from 'src/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comments {


	@PrimaryGeneratedColumn()
	id: number;


  // @ApiProperty({
  //   description: `This is Author`,
  //   type: Users,
  // })
	// @ManyToOne(() => Users )
  // author: Users;

  @ApiProperty({
    example: `This is a simple comment`,
    description: `Card's comment`,
    type: String,
  })
	@Column()
  content: string;
}
