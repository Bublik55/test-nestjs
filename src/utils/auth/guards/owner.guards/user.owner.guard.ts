import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ColumnsService } from 'src/columns/columns.service';
import { CardsService } from 'src/cards/cards.service';
import { CommentsService } from 'src/comments/comments.service';
import { UserEntityIds } from './utills';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@Injectable()
export class JwtOwnerGuard extends AuthGuard('jwt') {
  constructor() {
    super({});
  }

  canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    if (userEntityIds.entityID == userEntityIds.userID)
      return true;
    else throw new ForbiddenException('Forbidden');
  }
}

