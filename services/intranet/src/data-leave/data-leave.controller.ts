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
import { DataLeaveService } from './data-leave.service';
import { Prisma } from '@prisma/client';
import { UserInterceptor } from '@inventory/share';

@Controller('data-leave')
export class DataLeaveController {
  constructor(private readonly dataLeaveService: DataLeaveService) { }

  @Post()
  create(@Body('condition') condition: Prisma.dataLeaveCreateArgs) {
    return this.dataLeaveService.create(condition);
  }

  @Get()
  findAll() {
    return this.dataLeaveService.findAll();
  }

  @Get('condition')
  findFirstByCondition(@Query() params: any) {
    return this.dataLeaveService.findManyByCondition(params);
  }

  @Get('check-data-range')
  findMany(@Query() params: any) {
    return this.dataLeaveService.findMany(params);
  }

  @Get('leave-header')
  @UseInterceptors(UserInterceptor)
  findLeaveByUserId(@Req() req) {
    return this.dataLeaveService.findHeaderId(req.body.sub);
  }

  @Get('calendar-teams')
  @UseInterceptors(UserInterceptor)
  findLeaveTeamsByMonth(@Req() req, @Query() query: { month: Date | string }) {
    return this.dataLeaveService.findCalendarGroupByMonth(req.body.sub, query);
  }

  @Get('calendar')
  @UseInterceptors(UserInterceptor)
  findLeaveByMonth(@Req() req, @Query() query: { month: Date | string }) {
    return this.dataLeaveService.findCalendarByMonth(req.body.sub, query);
  }

  @Get('findGroup/:userId')
  findGroup(
    @Param('userId') userId: string,
    @Query() query: any,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.dataLeaveService.findGroup(userId, query, +skip, +take);
  }

  @Get('find-total-leave-by-group')
  @UseInterceptors(UserInterceptor)
  findTotalLeaveDetailByGroup(
    @Req() req,
    @Query() query: any,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    const token = req.body.sub;
    return this.dataLeaveService.findLeaveTotalByGroup(
      token,
      query,
      +skip,
      +take,
    );
  }
  @Get('findGroup-hr/:userId')
  findGroupHr(
    @Param('userId') userId: string,
    @Query() query: any,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.dataLeaveService.findGroupHr(userId, query, +skip, +take);
  }

  @Get('/:userId')
  findOne(
    @Param('userId') userId: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.dataLeaveService.findOne(userId, +skip, +take);
  }

  @Get(`find-detail-type-leave-by-userId/:userId`)
  findDetailTypeLeaveByUserId(@Param('userId') userId: string) {
    return this.dataLeaveService.findDetailTypeLeaveByUserId(userId);
  }

  @Get(`find-detail-by-type-leave-userId/:userId/:typeId`)
  findDetailByTypeLeaveUserId(@Param('userId') userId: string, @Param('typeId') typeId: string) {
    return this.dataLeaveService.findDetailByTypeLeaveUserId(userId, typeId);
  }

  @Get(`find-user-by-userId/:userId`)
  findUserByUserId(@Param('userId') userId: string) {
    return this.dataLeaveService.findUserByUserId(userId);
  }

  @Patch(':id')
  update(@Body('condition') condition: Prisma.dataLeaveUpdateArgs) {
    return this.dataLeaveService.update(condition);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataLeaveService.remove(+id);
  }
}
