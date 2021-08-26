import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
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
    type: User,
  })
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
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
