import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/create-user.dto';
import { ApiOperation, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { arrayContains } from 'class-validator';
import { User } from 'src/users/user.model';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

 //   @UseGuards(AuthGuard('local'))
    @Post('login')
	@ApiOperation({summary: 'Login User'})
	@ApiOkResponse({
		status: 201,
		description: 'User registred',
		type: String
	})
	async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }


    @Post('signup')
	@ApiOperation({summary: 'SignUp User'})
	@ApiOkResponse({
		status: 201,
		description: 'User registred',
		type: User
	})
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }
}