import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserGroupMapHeaderService } from './user-group-map-header.service';
import { Prisma } from '@prisma/client';
@Controller('user-group-map-header')
export class UserGroupMapHeaderController {
  constructor(
    private readonly userGroupMapHeaderService: UserGroupMapHeaderService,
  ) {}

  @Post()
  create(@Body() data: Prisma.userGroupMapHeaderCreateInput) {
    return this.userGroupMapHeaderService.create(data);
  }

  @Get()
  findAll() {
    return this.userGroupMapHeaderService.findAll();
  }

  @Post('condition')
  findByCondition(
    @Body('condition') condition: Prisma.userGroupMapHeaderFindManyArgs,
  ) {
    return this.userGroupMapHeaderService.findByCondition(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.userGroupMapHeaderUpdateInput,
  ) {
    return this.userGroupMapHeaderService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.userGroupMapHeaderService.remove(id);
  }
}
