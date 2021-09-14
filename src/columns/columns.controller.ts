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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {  Columns } from 'src/entities';
import { ColumnOwnerGuard } from 'src/utils/auth/guards/owner.guards/';
import { UserOwnerGuard } from 'src/utils/auth/guards/owner.guards/';
import { CreateColumnDto, UpdateColumnDto } from '../dtos';
import { ColumnsService } from './columns.service';
@ApiBearerAuth()
@Controller('/users/:userid/columns')
@ApiTags('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a column.',
    description: 'Any User ',
  })
  @ApiResponse({
    status: 201,
    description: 'Column created',
    type: Columns,
  })
  create(
    @Param('userid', ParseIntPipe) authorId : string,
    @Body() createColumnDto: CreateColumnDto,
  ) {
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
    type: [Columns],
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
    type: Columns,
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update column's content" })
  @ApiResponse({
    status: 200,
    description: 'Updated Column',
    type: Columns,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @UseGuards(ColumnOwnerGuard)
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({
    status: 200,
    description: 'Updated Column',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @UseGuards(ColumnOwnerGuard)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.columnsService.remove(id);
  }
}
