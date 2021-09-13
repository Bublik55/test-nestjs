import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Cards } from '../entities/';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cards]), UsersModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
