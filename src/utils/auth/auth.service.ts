import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { Users } from 'src/models/users.model';
import { Public } from './guards/jwt-auth.guard';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string) {
    const user = await this.userService.findOneByName(name);
    if (!user) {
      return null;
    }
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    user;
    return user.id;
  }

  public async login(loginDto) {
    const user = await this.userService.findOneByName(loginDto.name);
    if (await this.validateUser(loginDto.name, loginDto.password)) {
      const token = await this.generateToken(user);
      return { token };
    } else throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
  }

  public async create(user) {
	  console.log(user);
    const pass = await this.hashPassword(user.password);
    const newUser = await this.userService.create({ ...user, password: pass });
    const token = await this.generateToken(newUser);
    return { token };
  }

  private async generateToken(data: Users) {
    const token = await this.jwtService.signAsync({ ...data[`dataValues`] });
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
