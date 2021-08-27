import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';

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
	type: User
  })
  async create(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({
    status: 404,
    description: "User don't exists",
  })
  @ApiOkResponse({ type: User })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
  /*
  @Patch(':id')
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
*/
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
