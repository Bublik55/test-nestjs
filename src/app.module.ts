import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule } from './database.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DataBaseModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigService,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
