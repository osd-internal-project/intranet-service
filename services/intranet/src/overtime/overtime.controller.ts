import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { OverTimeService } from './overtime.service';
import { Prisma } from '@prisma/client';
import { UserInterceptor } from '@inventory/share';

@Controller('overtime')
export class OvetimeController {
  constructor(private readonly overtimeService: OverTimeService) {}

  @Post()
  create(@Body() condition: Prisma.overtimeCreateInput) {
    return this.overtimeService.create(condition);
  }

  @Get()
  findAll() {
    return this.overtimeService.findAll();
  }
  @Get('/by-id')
  @UseInterceptors(UserInterceptor)
  findById(
    @Req() req,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    const userId = req.body.sub;
    return this.overtimeService.findById(userId, +skip, +take);
  }

  @Get(':overtimeId')
  findOne(@Param('overtimeId') overtimeId: string) {
    return this.overtimeService.findOne(overtimeId);
  }

  @Get('find-many')
  async findByConditionTypeId(
    @Query('params') condition: Prisma.overtimeFindManyArgs,
  ) {
    return await this.overtimeService.findMany(condition, 10, 0);
  }

  @Patch(':id')
  update(
    @Param('overTimeID') overTimeID: string,
    @Body() updateDepartmentDto: Prisma.overtimeUpdateInput,
  ) {
    return this.overtimeService.update(overTimeID, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.overtimeService.remove(+id);
  }
}
