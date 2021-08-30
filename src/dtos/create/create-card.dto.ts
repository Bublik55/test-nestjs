import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/users.entity';
import { ColumnEntity } from 'src/entities/columns.entity';

export class CreateCardDto {
  @ApiProperty({
    description: `The author - owner`,
	type: UserEntity
  })
  author: Partial<UserEntity>;

  @ApiProperty({
    description: `The column to attach card`,
	type: String
  })
  column_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Column's content`,
    example: `Some awesome car's content`,
  })
  content: string;
}
