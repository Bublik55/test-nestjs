import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/dtos';
import { UserEntity } from 'src/entities/users.entity';

export class CommentEntity {
  constructor(comment: CreateCommentDto) {
    this.content = comment.content;
    this.author.id = comment.authorID;
  }

  @ApiProperty({
    description: `This is Author`,
    type: UserEntity,
  })
  author: Partial<UserEntity>;

  @ApiProperty({
    example: `This is a simple comment`,
    description: `Card's comment`,
    type: String,
  })
  content: string;
}
