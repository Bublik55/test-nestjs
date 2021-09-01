import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  ParseIntPipe,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { Cards } from '../models/cards.model';
import { CardsService } from './cards.service';
import { CreateCardDto, UpdateCardDto } from '../dtos/';
import { CardOwnerGuard } from 'src/utils/auth/guards/owner.guards/card.owner.guard';

@ApiBearerAuth()
@ApiTags('cards')
@Controller('/columns/:columnid/cards')
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
  @ApiOperation({ summary: `Get Card by id` })
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @UseGuards(CardOwnerGuard)
  @Patch(`:id`)
  @ApiOperation({ summary: `Update Card` })
  @ApiResponse({
    status: 403,
	description: `Forbidden`
  })
  update(@Param(`id`) id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @UseGuards(CardOwnerGuard)
  @Delete(`:id`)
  @ApiOperation({ summary: `Delete Card by ID` })
  @ApiResponse({
    status: 403,
	description: `Forbidden`,
  })
  remove(@Param(`id`) id: string) {
    return this.cardsService.remove(id);
  }
}
