import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ProfileRuleMapService } from './profile-rule-map.service';
import { Prisma } from '@prisma/client';
@Controller('profile-rule-map')
export class ProfileRuleMapController {
  constructor(private readonly profileRuleMapService: ProfileRuleMapService) {}

  @Post()
  create(@Body('data') data: Prisma.profileRuleMapCreateInput) {
    return this.profileRuleMapService.create(data);
  }

  @Get()
  findAll() {
    return this.profileRuleMapService.findAll();
  }

  @Post('condition')
  findByCondition(
    @Body('condition') condition: Prisma.profileRuleMapFindManyArgs,
  ) {
    return this.profileRuleMapService.findByCondition(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.profileRuleMapUpdateInput,
  ) {
    return this.profileRuleMapService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.profileRuleMapService.remove(id);
  }
}
