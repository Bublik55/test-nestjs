import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserOwnerGuard } from './guards/owner.guards/user.owner.guard';
import { CardOwnerGuard } from './guards/owner.guards/card.owner.guard';
import { CommentOwnerGuard } from './guards/owner.guards/comment.owner.guard';
import { ColumnOwnerGuard } from './guards/owner.guards/column.owner.guard';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserOwnerGuard,
    CardOwnerGuard,
    CommentOwnerGuard,
    ColumnOwnerGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
