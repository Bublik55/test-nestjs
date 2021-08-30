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
} from '@nestjs/swagger';
import { Columns } from '../models/columns.model';
import { ColumnsService } from './columns.service';
import { CreateColumnDto, UpdateColumnDto } from '../dtos';
import { ColumnEntity } from 'src/entities';
@ApiBearerAuth()
@Controller('/users/:userid/columns')
@ApiTags('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a column.', description: 'AuthorID/userID - ID in path' })
  @ApiResponse({
    status: 201,
    description: 'Column created',
    type: ColumnEntity,
  })
  create(
    @Param('userid') authorId: string,
    @Body() createColumnDto: CreateColumnDto,
  ): Promise<Columns> {
    return this.columnsService.create(authorId, createColumnDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all columns', description: `Get Columns by Authors id. AuthorID/userID - ID in path ` })
  @ApiResponse({
    status: 200,
    description: 'Columns of this user',
    type: [ColumnEntity],
  })
  findAllByAuthor(@Param('userid') userid: string): Promise<ColumnEntity[]> {
    return this.columnsService.findAllByAuthor(userid);
  }

  @Get(':id')
  @ApiOperation({
    summary: `Get Column by ID.`,
	description: `Return column by <b>ID</b> as Parametr.  Author's ID does not matter`
  })
  @ApiResponse({
    status: 200,
    description: 'Column by id',
    type: ColumnEntity,
  })
  findOne(@Param('id') id: string): Promise<ColumnEntity> {
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update column's content" })
  @ApiResponse({
    status: 200,
    description: 'Updated Column',
    type: ColumnEntity,
  })
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  
  @ApiOperation({ summary: "Delete column" })
  @ApiResponse({
    status: 200,
    description: 'Updated Column',
    type: Boolean,
  })
  @Delete(':id')
  remove(@Param('userid') userid: string, @Param('id') id: string) {
    return this.columnsService.remove(userid, id);
  }
}
