import { Controller, Body, Post, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dtos';
import { ApiOperation, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/models/users.model';
import { LoginDto } from './dto/login.dto';
import { LocalStrategy } from './strategies/local.strategy';
import { Public } from './guards/jwt-auth.guard';

@Public()
@ApiTags(`Auth/SignUp`)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

	@Post('login')
	@UseGuards(LocalStrategy)
	@ApiOperation({summary: 'Login User'})
	@ApiOkResponse({
		status: 201,
		description: 'Ok login',
	})
	async login(@Body() loginDto: LoginDto,) {
        return await this.authService.login(loginDto);
    }


	@Post(`signup`)
	@ApiOperation({summary: 'SignUp User'})
	@ApiOkResponse({
		status: 201,
		description: 'User registred',
	})
    async signUp(@Body() createUserDto: CreateUserDto) {
        return await this.authService.create(createUserDto);
    }
}