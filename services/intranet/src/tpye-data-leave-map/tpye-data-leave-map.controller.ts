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
import { TpyeDataLeaveMapService } from './tpye-data-leave-map.service';
import { Prisma } from '@prisma/client';

@Controller('tpye-data-leave-map')
export class TpyeDataLeaveMapController {
  constructor(
    private readonly tpyeDataLeaveMapService: TpyeDataLeaveMapService,
  ) {}

  @Post()
  create(@Body('condition') condition: Prisma.typeLeaveDisabledMapCreateArgs) {
    return this.tpyeDataLeaveMapService.create(condition);
  }

  @Get('condition')
  findMany(@Query() params: { userId: string; masterTypeleaveId: string }) {
    return this.tpyeDataLeaveMapService.findMany(params);
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
    @Body() updateTpyeDataLeaveMapDto: Prisma.typeLeaveDisabledMapUpdateArgs,
  ) {
    return this.tpyeDataLeaveMapService.update(+id, updateTpyeDataLeaveMapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tpyeDataLeaveMapService.remove(+id);
  }
}
