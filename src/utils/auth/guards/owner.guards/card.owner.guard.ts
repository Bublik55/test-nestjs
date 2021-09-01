import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardsService } from 'src/cards/cards.service';
import { UserEntityIds } from './utills';

@Injectable()
export class CardOwnerGuard extends AuthGuard('jwt') {
  constructor(private readonly cardService: CardsService) {
    super({});
  }

  async canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    const entity = await this.cardService.findOne(userEntityIds.entityID);
    if (entity && entity[`author_id`] == userEntityIds.userID) return true;
    else throw new ForbiddenException('Forbidden operation for Card');
  }
}
