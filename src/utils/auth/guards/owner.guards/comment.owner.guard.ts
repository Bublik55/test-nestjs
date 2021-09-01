import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from 'src/comments/comments.service';
import { UserEntityIds } from './utills';
@Injectable()
export class CommentOwnerGuard extends AuthGuard('jwt') {
  constructor(private readonly commentService: CommentsService) {
    super({});
  }

  async canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    const entity = await this.commentService.findOne(userEntityIds.entityID);
    if (entity && entity[`author_id`] == userEntityIds.userID) {
      return true;
    } else throw new ForbiddenException('Forbidden operation for comment');
  }
}
