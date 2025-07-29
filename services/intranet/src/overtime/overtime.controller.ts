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
import { Dayjs } from 'dayjs';

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
  @Get('find-many')
  @UseInterceptors(UserInterceptor)
  async findMany(
    @Req() req,
    @Query('params') condition: Prisma.overtimeCreateManyInput,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    const token = req.body.sub;
    return await this.overtimeService.findMany(condition, +skip, +take, token);
  }
  @Get('calendar')
  @UseInterceptors(UserInterceptor)
  async findByCalendar(
    @Req() req,
    @Query() query: { month: Dayjs | Date | string },
  ) {
    const token = req.body.sub;
    return await this.overtimeService.findByCalendar(query, token);
  }
  @Get('find-many-hr')
  @UseInterceptors(UserInterceptor)
  async findManyByHr(
    @Req() req,
    @Query('params') condition: Prisma.overtimeCreateManyInput,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    const token = req.body.sub;
    return await this.overtimeService.findManyByHr(
      condition,
      +skip,
      +take,
      token,
    );
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

  @Patch(':overTimeID')
  update(
    @Param('overTimeID') overTimeID: string,
    @Body() updateDepartmentDto: Prisma.overtimeUpdateInput,
  ) {
    return this.overtimeService.update(overTimeID, updateDepartmentDto);
  }

  @Delete(':overTimeID')
  remove(@Param('overTimeID') overTimeID: string) {
    return this.overtimeService.remove(overTimeID);
  }
}
