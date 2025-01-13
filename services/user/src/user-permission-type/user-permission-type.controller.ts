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
import { UserPermissionTypeService } from './user-permission-type.service';
import { Prisma } from '@prisma/client';
@Controller('user-permission-type')
export class UserPermissionTypeController {
  constructor(
    private readonly userPermissionTypeService: UserPermissionTypeService,
  ) {}

  @Post()
  create(@Body('data') data: Prisma.userPermissionTypeCreateInput) {
    return this.userPermissionTypeService.create(data);
  }

  @Get()
  findAll() {
    return this.userPermissionTypeService.findAll();
  }

  @Get('many')
  findMany(
    @Query('condition') condition: Prisma.userPermissionTypeFindManyArgs,
  ) {
    return this.userPermissionTypeService.findMany(condition);
  }
  @Get(':id')
  findFirst(@Param('id') id: string) {
    return this.userPermissionTypeService.findFirst(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.userPermissionTypeUpdateInput,
  ) {
    return this.userPermissionTypeService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPermissionTypeService.remove(+id);
  }
}
