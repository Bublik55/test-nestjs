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
import { Cards } from '../models/cards.model';
import { CardsService } from './cards.service';
import { CreateCardDto, UpdateCardDto } from '../dtos/';

@ApiBearerAuth()
@ApiTags('cards')
@Controller('/users/:userid/columns/:columnid/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(
    @Param(`columnid`) columnid: number,
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
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Patch(`:id`)
  update(@Param(`id`) id: string, @Body() updateCardDto: UpdateCardDto) {
	  return this.cardsService.update(id, updateCardDto);
  }

  @Delete(`:id`)
  remove(@Param(`id`) id: string) {
	  return this.cardsService.remove(id);
  }
}
