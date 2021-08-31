import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
	  description: `User's Name/login`
  })
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @ApiProperty({
	  description: `User's password - minLength = 6`
  })
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({
	  description: `Users's mail`
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
