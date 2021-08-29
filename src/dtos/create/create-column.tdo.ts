import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/users.entity';

export class CreateColumnDto {
  @ApiProperty({
    description: `This is Author`,
  })
  readonly author: Partial<UserEntity>;

  @IsString()
  @ApiProperty({
    description: "Column's content",
    example: 'Some awesome content',
  })
  @IsNotEmpty()
  readonly content: string;
}
