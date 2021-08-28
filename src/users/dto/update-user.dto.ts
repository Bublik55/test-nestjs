import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsString()
	@ApiProperty()
	@IsNotEmpty()
	readonly name: string;
  
	@IsString()
	@ApiProperty()
	@IsNotEmpty()
	@MinLength(6)
	readonly password: string;
  
	@IsEmail()
	@ApiProperty()
	@IsNotEmpty()
	readonly email: string;	
}
