import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PartialType, ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../index';

export class UpdateUserDto extends CreateUserDto{}
