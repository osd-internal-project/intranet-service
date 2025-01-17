import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { UserPermissionGroupService } from './user-permission-group.service';
import { Prisma } from '@prisma/client';
@Controller('user-permission-group')
export class UserPermissionGroupController {
  constructor(
    private readonly userPermissionGroupService: UserPermissionGroupService,
  ) {}

  @Post()
  create(@Body() data: Prisma.userPermissionGroupCreateInput) {
    return this.userPermissionGroupService.create(data);
  }

  @Get()
  findAll() {
    return this.userPermissionGroupService.findAll();
  }

  @Get('many')
  findMany(@Query('condition') condition: Prisma.userModuleWhereInput) {
    return this.userPermissionGroupService.findMany(condition);
  }
  @Post('set')
  set(@Body('data') data: any) {
    return this.userPermissionGroupService.set(data);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Prisma.userPermissionGroupUpdateInput,
  ) {
    return this.userPermissionGroupService.update(+id, data);
  }

  // @Patch('permission/:groupId')
  // updatePermission(
  //   @Param('groupId') groupId: string,
  //   @Body()
  //   data: { headerGroupId: string[]; type: string },
  // ) {
  //   return this.userPermissionGroupService.updatePermission(groupId, data);
  // }

  @Delete()
  remove(@Body('id') id: number) {
    return this.userPermissionGroupService.remove(id);
  }
}
