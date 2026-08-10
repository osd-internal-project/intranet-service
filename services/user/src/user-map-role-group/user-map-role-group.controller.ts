import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UserMapRoleGroupService } from './user-map-role-group.service';
import { Prisma } from '@prisma/client';

@Controller('user-map-role-group')
export class UserMapRoleGroupController {
  constructor(
    private readonly userMapRoleGroupService: UserMapRoleGroupService,
  ) {}

  @Post()
  create(@Body() data: Prisma.userMapRoleGroupCreateInput) {
    return this.userMapRoleGroupService.create(data);
  }

  @Get()
  findAll() {
    return this.userMapRoleGroupService.findAll();
  }

  @Post('condition')
  findMany(@Body('condition') condition: Prisma.userMapRoleGroupWhereInput) {
    return this.userMapRoleGroupService.findMany(condition);
  }

  @Get('group/:groupId')
  findRoleCodesByGroupId(@Param('groupId') groupId: string) {
    return this.userMapRoleGroupService.findRoleCodesByGroupId(groupId);
  }

  @Post('set')
  setRoles(@Body() data: { groupId: string; roleCodes: string[] }) {
    return this.userMapRoleGroupService.setRolesByGroupId(
      data.groupId,
      data.roleCodes,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Prisma.userMapRoleGroupUpdateInput,
  ) {
    return this.userMapRoleGroupService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userMapRoleGroupService.remove(+id);
  }
}
