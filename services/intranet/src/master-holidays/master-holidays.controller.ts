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

@Controller('master-holidays')
export class MasterHolidaysController {
  constructor(private readonly masterHolidaysService: MasterHolidaysService) {}

  @Post()
  create(@Body() data: CreateMasterHolidayDto) {
    return this.masterHolidaysService.create(data);
  }

  @Post('condition')
  findBycondition(
    @Body('condition') condition: Prisma.masterHolidaysFindManyArgs,
  ) {
    return this.masterHolidaysService.findMany(condition);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterHolidaysService.findOne(+id);
  }

  @Get('year/:year')
  findByYearId(@Param('year') year: string) {
    return this.masterHolidaysService.findByYear(year);
  }
  @Get()
  findAll() {
    return this.masterHolidaysService.findAll();
  }

  @Patch()
  update(@Body('condition') condition: Prisma.masterHolidaysUpdateArgs) {
    return this.masterHolidaysService.update(condition);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterHolidaysService.remove(+id);
  }
}
