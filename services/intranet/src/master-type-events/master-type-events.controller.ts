import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MasterTypeEventsService } from './master-type-events.service';

@Controller('master-type-events')
export class MasterTypeEventsController {
  constructor(
    private readonly masterTypeEventsService: MasterTypeEventsService,
  ) {}

  @Post()
  create(@Body() createMasterTypeEventDto: Prisma.masterTypeEventsCreateInput) {
    return this.masterTypeEventsService.create(createMasterTypeEventDto);
  }

  @Get()
  findAll(
    @Query('params') condition: Prisma.masterTypeEventsCreateInput,
    @Query('take') take: string,
    @Query('skip') skip: string,
  ) {
    return this.masterTypeEventsService.findAll(condition, +take, +skip);
  }

  @Get('options')
  findDropdown() {
    return this.masterTypeEventsService.findDropDown();
  }

  @Get(':id')
  findOne(
    @Query() condition: Prisma.masterTypeEventsCreateInput,
    @Param('id') id: string,
  ) {
    return this.masterTypeEventsService.findOne(+id, condition);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterTypeEventDto: Prisma.masterTypeEventsCreateInput,
  ) {
    return this.masterTypeEventsService.update(+id, updateMasterTypeEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterTypeEventsService.remove(+id);
  }
}
