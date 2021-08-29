import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/users.entity';
import { CardEntity } from 'src/entities/cards.entities';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly author: UserEntity;

  @ApiProperty()
  @IsNotEmpty()
  readonly card: CardEntity;

  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  readonly content: string;
}
