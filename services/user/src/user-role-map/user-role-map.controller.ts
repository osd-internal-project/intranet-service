import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserRoleMapService } from './user-role-map.service';
import { Prisma } from '@prisma/client';
@Controller('user-role-map')
export class UserRoleMapController {
  constructor(private readonly userRoleMapService: UserRoleMapService) {}

  @Post()
  create(@Body('data') data: Prisma.userRoleMapCreateInput) {
    return this.userRoleMapService.create(data);
  }

  @Post('condition')
  findByCondition(
    @Body('condition') condition: Prisma.userRoleMapFindManyArgs,
  ) {
    return this.userRoleMapService.findByCondition(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.userRoleMapUpdateInput,
  ) {
    return this.userRoleMapService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.userRoleMapService.remove(id);
  }

  @Post('find-rule-by-userid')
  findRuleByUserId(@Body('userid') userid: string) {
    return this.userRoleMapService.findRulelistByUserId(userid);
  }

  @Get()
  findAll() {
    return this.userRoleMapService.findAll();
  }
}
