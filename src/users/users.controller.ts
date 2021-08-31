import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  ExecutionContext,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
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
import { UserEntity } from '../entities';
import { Public } from 'src/utils/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiOkResponse({
    status: 200,
    description: 'User created',
    type: UserEntity,
  })
  @ApiResponse({
    status: 500,
    description: `User with email/login already exist`,
  })
  async create(@Body() userDto: CreateUserDto) {
    return await this.userService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [UserEntity],
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({
    status: 404,
    description: "User don't exists",
  })
  @ApiOkResponse({
    status: 200,
    description: 'Successful operation',
    type: UserEntity,
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update User' })
  @ApiOkResponse({
    status: 200,
    description: `Successful operation`,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async remove(@Param('id', ParseIntPipe) id: string): Promise<Boolean> {
    return await this.userService.remove(id);
  }
}
