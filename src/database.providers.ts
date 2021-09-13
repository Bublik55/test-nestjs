import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cards,Comments, Columns, Users} from './entities';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME || 'test',
      password: process.env.DB_PASSWORD || 'abc123',
      database: process.env.DB_BASE_NAME || 'test',
			entities: [Cards, Comments, Columns, Users],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class DataBaseModule {}
