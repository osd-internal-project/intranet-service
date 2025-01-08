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
import { UserHeaderTypeService } from './user-header-type.service';
import { Prisma } from '@prisma/client';
@Controller('user-header-type')
export class UserHeaderTypeController {
  constructor(private readonly userHeaderTypeService: UserHeaderTypeService) {}

  @Post()
  create(@Body() data: Prisma.userHeaderTypeCreateInput) {
    return this.userHeaderTypeService.create(data);
  }

  @Get()
  findAll() {
    return this.userHeaderTypeService.findAll();
  }

  @Get('meny')
  findMany(@Query('condition') condition: Prisma.userHeaderTypeFindManyArgs) {
    return this.userHeaderTypeService.findMany(condition);
  }
  @Get(':id')
  findFirst(@Param('id') id: string) {
    return this.userHeaderTypeService.findFirst(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Prisma.userHeaderTypeUpdateInput,
  ) {
    return this.userHeaderTypeService.update(+id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.userHeaderTypeService.remove(id);
  }
}
