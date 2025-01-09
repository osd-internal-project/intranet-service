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
  create(@Body() data: Prisma.userPermissionTypeCreateInput) {
    return this.userPermissionTypeService.create(data);
  }

  @Get()
  findAll() {
    return this.userPermissionTypeService.findAll();
  }

  @Get('meny')
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
    @Param('id') id: number,
    @Body() data: Prisma.userPermissionTypeUpdateInput,
  ) {
    return this.userPermissionTypeService.update(+id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.userPermissionTypeService.remove(id);
  }
}
