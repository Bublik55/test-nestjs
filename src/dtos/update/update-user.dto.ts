import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../index' 

export class UpdateUserDto extends PartialType(CreateUserDto) {}
