import { Injectable, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ColumnsService } from 'src/columns/columns.service';
import { CardsService } from 'src/cards/cards.service';
import { CommentsService } from 'src/comments/comments.service';
import { UserEntityIds } from './utills';
import { CardEntity } from 'src/entities';
@Injectable()
export class ColumnOwnerGuard extends AuthGuard('jwt') {
  constructor(
    private readonly columnService: CommentsService
  ) {
    super({});
  }

  canActivate(context: ExecutionContext) {

    const userEntityIds = UserEntityIds(context);
    const entity = this.columnService.findOne(userEntityIds.entityID);
    if (entity[`author_id`] == userEntityIds.userID)
      return true;
    else throw new ForbiddenException('Forbidden');
  }
}
