import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { MasterProductGroupService } from './master-product-group.service';
import { Prisma } from '@prisma/client';
@Controller('master-product-group')
export class MasterProductGroupController {
  constructor(
    private readonly masterProductGroupService: MasterProductGroupService,
  ) {}

  @Post()
  create(@Body('data') data: Prisma.masterProductGroupCreateInput) {
    return this.masterProductGroupService.create(data);
  }

  @Get()
  findAll() {
    return this.masterProductGroupService.findAll();
  }

  @Post('condition')
  findMany(
    @Body('condition') condition: Prisma.masterProductGroupFindManyArgs,
  ) {
    return this.masterProductGroupService.findMany(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.masterProductGroupUpdateInput,
  ) {
    return this.masterProductGroupService.update(id, data);
  }

  @Delete(':param')
  remove(@Param('param') param: string) {
    const id = Number(param);
    return this.masterProductGroupService.remove(id);
  }
}
