import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/users.entity';
import { ColumnEntity } from 'src/entities';

export class CreateColumnDto {

  @ApiProperty({
    description: `This is Author\'s ID`,
  })
  readonly authorID: number;

  @IsString()
  @ApiProperty({
    description: `Column's content`,
    example: 'Some awesome content',
  })
  @IsNotEmpty()
  readonly content: string;
}
