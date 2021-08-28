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
import { Cards } from './Cards.model';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiBearerAuth()
@ApiTags('users/{userid}/columns/{columnid}/cards')
@Controller('/users/:userid/columns/:columnid/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(
    @Param(`columnid`) columnid: string,
    @Body() createCardDto: CreateCardDto,
  ): Promise<Cards> {
    return this.cardsService.create(columnid, createCardDto);
  }

  @Get()
  @ApiOperation({ summary: `Get all Cards of current Column` })
  findAll(@Param(':columnID') columnID: string) {
    return this.cardsService.findAll(columnID);
  }

  @Get(`:id`)
  findOne(@Param(':id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Patch(`:id`)
  update(@Param(`id`) id: string, @Body() updateCardDto: UpdateCardDto) {
	  return this.cardsService.update(id, updateCardDto);
  }

  @Delete(`:id`)
  remove(@Param(`:id`) id: string) {
	  return this.cardsService.remove(id);
  }
}
