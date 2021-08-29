import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos';
import { ColumnEntity } from './columns.entity';

export class UserEntity {
  constructor(user: CreateUserDto) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
  }

  @ApiProperty({
    example: 1,
    description: `User's ID`,
  })
  id: number;

  @ApiProperty({
    example: 'Boby',
    description: "The user's name",
  })
  name: string;

  @ApiProperty({
    example: 'Pa$$word',
    description: "The user's password",
  })
  password: string;

  @ApiProperty({
    example: 'email@gmail.com',
    description: "The user's mail",
  })
  email: string;

  @ApiProperty()
  columns: Partial<ColumnEntity[]>;
}
