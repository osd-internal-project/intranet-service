import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Prisma } from '@prisma/client';
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body('data') data: Prisma.inventoryCreateInput) {
    return this.inventoryService.create(data);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get('not-owner')
  findNotOwner(@Query('location') locationId: number) {
    return this.inventoryService.findNotOwner(Number(locationId));
  }

  @Post('condition')
  findMany(@Body('condition') condition: Prisma.inventoryFindManyArgs) {
    return this.inventoryService.findMany(condition);
  }

  @Post('count')
  count(@Body('condition') condition: Prisma.inventoryFindManyArgs) {
    return this.inventoryService.count(condition);
  }

  @Post('find-by-user-group')
  findByUserGroup(
    @Body('userGroup') userGroup: string[],
    @Body('search') search: object,
  ) {
    return this.inventoryService.findByUserGroup(userGroup, search);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.inventoryUpdateInput,
  ) {
    return this.inventoryService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.inventoryService.remove(id);
  }
}
