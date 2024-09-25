import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
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

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Prisma.userGroupMapHeaderUpdateInput,
  ) {
    return this.userGroupMapHeaderService.update(+id, data);
  }

  @Patch('permission/:groupId')
  updatePermission(
    @Param('groupId') groupId: string,
    @Body()
    data,
  ) {
    console.log(groupId);

    return this.userGroupMapHeaderService.updatePermission(groupId, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.userGroupMapHeaderService.remove(id);
  }
}
