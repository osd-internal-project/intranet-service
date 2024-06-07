import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MasterHolidaysService } from './master-holidays.service';
import { CreateMasterHolidayDto } from './dto/create-master-holiday.dto';
import { UpdateMasterHolidayDto } from './dto/update-master-holiday.dto';

@Controller('master-holidays')
export class MasterHolidaysController {
  constructor(private readonly masterHolidaysService: MasterHolidaysService) {}

  @Post()
  create(@Body('condition') condition: CreateMasterHolidayDto) {
    return this.masterHolidaysService.create(condition);
  }

  @Post('condition')
  findBycondition(@Body('condition') condition: CreateMasterHolidayDto) {
    return this.masterHolidaysService.findAll();
  }

  @Get()
  findAll() {
    return this.masterHolidaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterHolidaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Body('condition') condition: UpdateMasterHolidayDto) {
    return this.masterHolidaysService.update(condition);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterHolidaysService.remove(+id);
  }
}
