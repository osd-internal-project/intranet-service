import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MasterTypeEventsService } from './master-type-events.service';
import { CreateMasterTypeEventDto } from './dto/create-master-type-event.dto';
import { UpdateMasterTypeEventDto } from './dto/update-master-type-event.dto';

@Controller('master-type-events')
export class MasterTypeEventsController {
  constructor(private readonly masterTypeEventsService: MasterTypeEventsService) {}

  @Post()
  create(@Body() createMasterTypeEventDto: CreateMasterTypeEventDto) {
    return this.masterTypeEventsService.create(createMasterTypeEventDto);
  }

  @Get()
  findAll() {
    return this.masterTypeEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterTypeEventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterTypeEventDto: UpdateMasterTypeEventDto) {
    return this.masterTypeEventsService.update(+id, updateMasterTypeEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterTypeEventsService.remove(+id);
  }
}
