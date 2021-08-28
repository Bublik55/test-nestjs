import { Controller, Body, Post, UseGuards, Request, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOperation, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Users } from 'src/users/users.model';
import { LoginDto } from './dto/login.dto';
import { LocalStrategy } from './strategies/local.strategy';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

	@UseGuards(LocalStrategy)
    @Post('login')
	@ApiOperation({summary: 'Login User'})
	@ApiOkResponse({
		status: 201,
		description: 'User registred',
		type: String
	})
	async login(@Body() loginDto: LoginDto,) {
        return await this.authService.login(loginDto);
    }


    @Post('signup')
	@ApiOperation({summary: 'SignUp User'})
	@ApiOkResponse({
		status: 201,
		description: 'User registred',
		type: Users
	})
    async signUp(@Body() user: CreateUserDto) {
        return await this.authService.create(user);
    }
}