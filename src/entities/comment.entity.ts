import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto, CreateUserDto } from 'src/dtos';
import { UserEntity } from 'src/entities/users.entity';

export class CommentEntity {
  constructor(comment: CreateCommentDto) {
    this.content = comment.content;
    this.author = { id: comment.author.id };
  }

  @ApiProperty({
    description: `This is Author`,
  })
  author: Partial<UserEntity>;

  @ApiProperty({
    example: `This is a simple comment`,
    description: `Card's comment`,
  })
  content: string;
}
