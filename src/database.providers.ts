import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Card,Comment, Column, User} from './entities';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'test',
      password: process.env.DB_PASSWORD || 'abc123',
      database: process.env.DB_BASE_NAME || 'test',
			entities: [Card, Comment, Column, User],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class DataBaseModule {}
