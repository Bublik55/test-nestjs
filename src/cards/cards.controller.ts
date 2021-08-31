import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Cards } from '../models/cards.model';
import { CardsService } from './cards.service';
import { CreateCardDto, UpdateCardDto } from '../dtos/';

@ApiBearerAuth()
@ApiTags('cards')
@Controller('/users/:userid/columns/:columnid/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({
    summary: `Create Card`,
    description: `Create and attach card to column`,
  })
  create(
    @Param(`columnid`, ParseIntPipe) columnid: string,
    @Body() createCardDto: CreateCardDto,
  ): Promise<Cards> {
    return this.cardsService.create(columnid, createCardDto);
  }

  @Get()
  @ApiOperation({ summary: `Get all Cards of current Column` })
  findAll(@Param('columnid') columnID: string) {
    return this.cardsService.findAll(columnID);
  }

  @Get(`:id`)
  @ApiOperation({ summary: `Get all Card by id` })
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Patch(`:id`)
  @ApiOperation({ summary: `Update Card` })
  update(@Param(`id`) id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(`:id`)
  @ApiOperation({ summary: `Delete Card by ID` })
  remove(@Param(`id`) id: string) {
    return this.cardsService.remove(id);
  }
}
