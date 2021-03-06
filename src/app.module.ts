import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule } from './database.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './utils/auth/auth.module';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './utils/auth/guards/jwt-auth.guard';
@Module({
  imports: [
    AuthModule,
    DataBaseModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigService,
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
	{
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

  ],
})
export class AppModule {}
