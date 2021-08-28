import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Cards } from './cards.model';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Cards]), UsersModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
