import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/users.entity';
import { ColumnEntity } from 'src/entities/columns.entity';

export class CreateCardDto {
  @ApiProperty({
    description: `The author's ID`,
  })
  author: Partial<UserEntity>;

  @ApiProperty({
    description: `The column's ID`,
  })
  columns: Partial<ColumnEntity>;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Column's content`,
    example: 'Some awesome content',
  })
  content: string;
}
