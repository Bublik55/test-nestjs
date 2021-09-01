import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Columns } from '../models/columns.model';
import { UsersModule } from '../users/users.module';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';

@Module({
  imports: [SequelizeModule.forFeature([Columns]), UsersModule],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
