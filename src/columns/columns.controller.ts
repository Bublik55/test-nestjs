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
import { Columns } from '../models/columns.model';

import { ColumnsService } from './columns.service';
import { CreateColumnDto, UpdateColumnDto } from '../dtos';

@ApiBearerAuth()
@Controller('/users/:userid/columns')
@ApiTags('users/{userid}/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a column. Author - user with ID in path' })
  @ApiResponse({
    status: 201,
    description: 'Column created',
    type: Columns,
  })
  create(
    @Param('userid') authorId: string,
    @Body() createColumnDto: CreateColumnDto,
  ): Promise<Columns> {
    return this.columnsService.create(authorId, createColumnDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all columns of current user' })
  @ApiResponse({
    status: 200,
    description: 'Columns of this user',
    type: Columns,
  })
  findAllByAuthor(@Param('userid') userid: string): Promise<Columns[]> {
    return this.columnsService.findAllByAuthor(userid);
  }

  @Get(':id')
  @ApiOperation({
    summary: `Get Column by ID or nothing. 
							Author's ID does not matter`,
  })
  findOne(@Param('id') id: string): Promise<Columns | any> {
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update column's content" })
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('userid') userid: string, @Param('id') id: string) {
    return this.columnsService.remove(userid, id);
  }
}
