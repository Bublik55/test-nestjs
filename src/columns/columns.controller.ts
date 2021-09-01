import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { CreateColumnDto, UpdateColumnDto } from '../dtos';
import { ColumnEntity } from 'src/entities';
import { ColumnOwnerGuard } from 'src/utils/auth/guards/owner.guards/column.owner.guard';
@ApiBearerAuth()
@Controller('/users/:userid/columns')
@ApiTags('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a column.',
    description: 'AuthorID/userID - ID in path',
  })
  @ApiResponse({
    status: 201,
    description: 'Column created',
    type: ColumnEntity,
  })
  create(
    @Param('userid', ParseIntPipe) authorId,
    @Body() createColumnDto: CreateColumnDto,
  ) {
    createColumnDto.authorID = authorId;
    return this.columnsService.create(createColumnDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all columns',
    description: `Get Columns by Authors id. AuthorID/userID - ID in path `,
  })
  @ApiResponse({
    status: 200,
    description: 'Columns of this user',
    type: [ColumnEntity],
  })
  findAllByAuthor(@Param('userid', ParseIntPipe) userid: string) {
    return this.columnsService.findAllByAuthor(userid);
  }

  @Get(':id')
  @ApiOperation({
    summary: `Get Column by ID.`,
    description: `Return column by <b>ID</b> as Parametr.  
					Author's ID does not matter`,
  })
  @ApiResponse({
    status: 200,
    description: 'Column by id',
    type: ColumnEntity,
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update column's content" })
  @ApiResponse({
    status: 200,
    description: 'Updated Column',
    type: ColumnEntity,
  })
  @UseGuards(ColumnOwnerGuard)
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({
    status: 200,
    description: 'Updated Column',
    type: Boolean,
  })
  @Delete(':id')
  @UseGuards(ColumnOwnerGuard)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.columnsService.remove(id);
  }
}
