import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UserGroupMapPermissionService } from './user-group-map-permission.service';
import { Prisma } from '@prisma/client';
@Controller('user-group-map-permission')
export class UserGroupMapPermissionController {
  constructor(
    private readonly userGroupMapPermissionService: UserGroupMapPermissionService,
  ) {}

  @Post()
  create(@Body() data: Prisma.userGroupMapPermissionCreateInput) {
    return this.userGroupMapPermissionService.create(data);
  }

  @Get()
  findAll() {
    return this.userGroupMapPermissionService.findAll();
  }

  @Post('condition')
  findByCondition(
    @Body('condition') condition: Prisma.userGroupMapPermissionFindManyArgs,
  ) {
    return this.userGroupMapPermissionService.findByCondition(condition);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Prisma.userGroupMapPermissionUpdateInput,
  ) {
    return this.userGroupMapPermissionService.update(+id, data);
  }

  @Patch('permission/:groupId')
  updatePermission(
    @Param('groupId') groupId: string,
    @Body()
    data: { headerGroupId: string[]; type: string },
  ) {
    return this.userGroupMapPermissionService.updatePermission(groupId, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.userGroupMapPermissionService.remove(id);
  }
}
