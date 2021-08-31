import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ColumnsService } from 'src/columns/columns.service';
import { CardsService } from 'src/cards/cards.service';
import { CommentsService } from 'src/comments/comments.service';
import { ExtractJwt } from 'passport-jwt';
import { UserEntityIds } from './utills';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@Injectable()
export class JwtOwnerGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super({
      userService: UsersService,
      columnService: ColumnsService,
      cardService: CardsService,
      commentService: CommentsService,
    });
  }

  canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    console.log(userEntityIds);
    return true;
  }
}
