import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
