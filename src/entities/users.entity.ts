import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos';
import { ColumnEntity } from './columns.entity';

@ApiTags(`Entities`)
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
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'Pa$$word',
    description: "The user's password",
    type: String,
  })
  password: string;

  @ApiProperty({
    example: 'email@gmail.com',
    description: "The user's mail",
  })
  email: string;

  @ApiProperty({
    description: `The user's Columns`,
    type: ColumnEntity,
  })
  columns: Partial<ColumnEntity[]>;
}
