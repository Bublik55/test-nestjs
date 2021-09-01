import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from 'src/comments/comments.service';
import { UserEntityIds } from './utills';
@Injectable()
export class ColumnOwnerGuard extends AuthGuard('jwt') {
  constructor(private readonly columnService: CommentsService) {
    super({});
  }

  async canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    const entity = await this.columnService.findOne(userEntityIds.entityID);
    if (entity && entity[`author_id`] == userEntityIds.userID) return true;
    else throw new ForbiddenException('Forbidden operation for column');
  }
}
