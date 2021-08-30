import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { Card } from './card/entities/card.entity';
//import { Comment } from './models/comment/entities/comment.entity';
//import { Column } from './models/column/entities/column.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: <number><unknown>process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME || 'test',
      password: process.env.DB_PASSWORD || 'abc123',
      database: process.env.DB_BASE_NAME || 'test',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class DataBaseModule {}
