import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TpyeDataLeaveMapService } from './tpye-data-leave-map.service';
import { CreateTpyeDataLeaveMapDto } from './dto/create-tpye-data-leave-map.dto';
import { UpdateTpyeDataLeaveMapDto } from './dto/update-tpye-data-leave-map.dto';

@Controller('tpye-data-leave-map')
export class TpyeDataLeaveMapController {
  constructor(
    private readonly tpyeDataLeaveMapService: TpyeDataLeaveMapService,
  ) {}

  @Post()
  create(@Body() createTpyeDataLeaveMapDto: CreateTpyeDataLeaveMapDto) {
    return this.tpyeDataLeaveMapService.create(createTpyeDataLeaveMapDto);
  }

  @Get()
  findAll() {
    return this.tpyeDataLeaveMapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tpyeDataLeaveMapService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTpyeDataLeaveMapDto: UpdateTpyeDataLeaveMapDto,
  ) {
    return this.tpyeDataLeaveMapService.update(+id, updateTpyeDataLeaveMapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tpyeDataLeaveMapService.remove(+id);
  }
}
