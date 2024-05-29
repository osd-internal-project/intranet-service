import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserGroupMapService } from './user-group-map.service';
import { Prisma } from '@prisma/client';
@Controller('user-group-map')
export class UserGroupMapController {
  constructor(private readonly userGroupMapService: UserGroupMapService) {}

  @Post()
  create(@Body('data') data: Prisma.userGroupMapCreateInput) {
    return this.userGroupMapService.create(data);
  }

  @Get()
  findAll() {
    return this.userGroupMapService.findAll();
  }

  @Post('condition')
  findByCondition(
    @Body('condition') condition: Prisma.userGroupMapFindManyArgs,
  ) {
    return this.userGroupMapService.findByCondition(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.userGroupMapUpdateInput,
  ) {
    return this.userGroupMapService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.userGroupMapService.remove(id);
  }
}
