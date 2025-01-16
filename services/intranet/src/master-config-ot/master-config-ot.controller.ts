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
import { MasterConfigOvertimeService } from './master-config-ot.service';
import { Prisma } from '@prisma/client';

@Controller('master-config-ot')
export class MasterConfigOvertimeController {
  constructor(
    private readonly masterconfigovertimeService: MasterConfigOvertimeService,
  ) {}

  @Post()
  create(@Body() condition: Prisma.masterDataConfigTimeOTCreateInput) {
    return this.masterconfigovertimeService.create(condition);
  }

  @Get()
  findAll() {
    return this.masterconfigovertimeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterconfigovertimeService.findOne(+id);
  }
  @Get('/by-date/:date')
  findByDate(@Param('date') date: string) {
    return this.masterconfigovertimeService.findbyDate(date);
  }

  @Get('find-many')
  async findByConditionTypeId(
    @Query('params') condition: Prisma.masterDataConfigTimeOTFindManyArgs,
  ) {
    return await this.masterconfigovertimeService.findMany(condition, 10, 0);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: Prisma.masterDataConfigTimeOTUpdateInput,
  ) {
    return this.masterconfigovertimeService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterconfigovertimeService.remove(+id);
  }
}
