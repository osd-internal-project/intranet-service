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
import { UserModuleService } from './user-module.service';
import { Prisma } from '@prisma/client';
@Controller('user-module')
export class UserModuleController {
  constructor(private readonly userModuleService: UserModuleService) {}

  @Post()
  create(@Body('data') data: Prisma.userModuleCreateInput) {
    return this.userModuleService.create(data);
  }

  @Get()
  findAll() {
    return this.userModuleService.findAll();
  }

  @Get('many')
  findMany(@Query('condition') condition: Prisma.userModuleFindManyArgs) {
    return this.userModuleService.findMany(condition);
  }
  @Get(':id')
  findFirst(@Param('id') id: string) {
    return this.userModuleService.findFirst(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.userModuleUpdateInput,
  ) {
    return this.userModuleService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userModuleService.remove(+id);
  }
}
