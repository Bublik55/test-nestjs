import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
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
