import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { UserEntity } from '../entities/users.entity';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: UserEntity,
  })
  async create(@Body() userDto: CreateUserDto)  {
    return await this.userService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({
    status: 404,
    description: "User don't exists",
  })
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string){
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async remove(@Param('id') id: string): Promise<Boolean> {
    return await this.userService.remove(id);
  }
}
