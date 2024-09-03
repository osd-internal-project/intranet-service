import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Logger,
} from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { Prisma } from '@prisma/client';
@Controller('user-group')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Post()
  create(@Body('data') data: any) {
    return this.userGroupService.create(data);
  }

  @Get()
  findAll() {
    return this.userGroupService.findAll();
  }
  @Get('find-group-by-user/:userid')
  findOwnerFormOrganizedByUser(@Param('userid') userid) {
    return this.userGroupService.findOwnerFormOrganizedByUser(userid);
  }

  @Get(':organizeid')
  findByOrganizeId(@Param('organizeid') organizeId: string) {
    return this.userGroupService.findByOrganizeId(organizeId);
  }

  @Post('condition')
  findByCondition(@Body('condition') condition: Prisma.userGroupFindManyArgs) {
    return this.userGroupService.findByCondition(condition);
  }
  @Post('condition-first')
  async findOneByCondition(
    @Body('condition') condition: Prisma.userGroupFindFirstArgs,
  ) {
    const data = await this.userGroupService.findOneByCondition(condition);
    return data;
  }

  @Patch(':groupId')
  update(
    @Param('groupId') groupId: string,
    @Body()
    data: {
      groupId: string;
      groupName: string;
      headId: string;
      description?: string;
      userRole: string[];
    },
  ) {
    Logger.debug(data);
    return this.userGroupService.update(groupId, data);
  }
  @Patch('permission/:groupId')
  updatePermission(
    @Param('groupId') groupId: string,
    @Body()
    data,
  ) {
    return this.userGroupService.updatePermission(groupId, data);
  }

  @Delete(':groupId')
  async remove(@Param('groupId') groupId: string) {
    const checkParent = await this.userGroupService.findChildGroupByGropId(
      groupId,
    );

    const checkUsed = await this.userGroupService.findUserByGropId(groupId);
    if (checkParent.length > 0) {
      return {
        status: 401,
        message: `ไม่สามารถลบได้เนื่องจากมีกลุ่มย่อยอยู่`,
      };
    } else if (checkUsed.length > 0) {
      return {
        status: 401,
        message: `ไม่สามารถลบได้เนื่องจากมีผู้ใช้อยู่ในกลุ่ม`,
      };
    } else {
      return this.userGroupService.remove(groupId);
    }
  }
}
