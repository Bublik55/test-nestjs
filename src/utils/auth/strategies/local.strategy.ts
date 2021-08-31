import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: true,
             secretOrKey: process.env.JWTKEY,
        });
    }

  async validate(loginDto:LoginDto): Promise<any> {
	  console.log(loginDto);
    const user = await this.authService.validateUser(loginDto.name, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid user\'s data');
    }
    return user;
  }
}
