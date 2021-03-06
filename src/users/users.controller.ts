import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/auth/guards/jwt-auth.guard';
import { UserOwnerGuard } from 'src/utils/auth/guards/owner.guards/user.owner.guard';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { Users } from '../entities';
import { UsersService } from './users.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService,
		) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiOkResponse({
    status: 200,
    description: 'User created',
    type: Users,
  })
  @ApiResponse({
    status: 500,
    description: `User with email/login already exist`,
  })
  private async create(@Body() userDto: CreateUserDto) {
    return await this.userService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [Users],
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
    type: Users,
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
  @UseGuards(UserOwnerGuard)
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
  @UseGuards(UserOwnerGuard)
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.userService.remove(id);
  }
}
