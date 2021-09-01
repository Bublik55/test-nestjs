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
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CardOwnerGuard } from 'src/utils/auth/guards/owner.guards/card.owner.guard';
import { CreateCardDto, UpdateCardDto } from '../dtos/';
import { CardsService } from './cards.service';

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
  ) {
    return this.cardsService.create(columnid, createCardDto);
  }

  @Get()
  @ApiOperation({
    summary: `Get all Cards`,
    description: `Get all cards of current Column`,
  })
  @ApiResponse({
    status: 200,
    description: `Seccess operation`,
  })
  findAll(@Param('columnid', ParseIntPipe) columnID: string) {
    return this.cardsService.findAll(columnID);
  }

  @Get(`:id`)
  @ApiOperation({ summary: `Get Card by id` })
  @ApiResponse({
    status: 200,
    description: `Seccess operation`,
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.cardsService.findOne(id);
  }

  @UseGuards(CardOwnerGuard)
  @Patch(`:id`)
  @ApiOperation({ summary: `Update Card` })
  @ApiResponse({
    status: 200,
    description: `Seccess operation`,
  })
  @ApiResponse({
    status: 403,
    description: `Forbidden`,
  })
  update(
    @Param(`id`, ParseIntPipe) id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(id, updateCardDto);
  }

  @UseGuards(CardOwnerGuard)
  @Delete(`:id`)
  @ApiOperation({ summary: `Delete Card by ID` })
  @ApiResponse({
    status: 200,
    description: `Seccess operation`,
  })
  @ApiResponse({
    status: 403,
    description: `Forbidden`,
  })
  remove(@Param(`id`) id: string) {
    return this.cardsService.remove(id);
  }
}
