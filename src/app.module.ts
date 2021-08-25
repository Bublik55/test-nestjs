import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user/user.module';
import { ColumnModule, CardModule, CommentModule } from './models';

@Module({
  imports: [UserModule, ColumnModule, CardModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
