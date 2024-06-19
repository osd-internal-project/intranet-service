import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerGroupService } from './customer-group.service';
import { Prisma } from '@prisma/client';
@Controller('customer-group')
export class CustomerGroupController {
  constructor(private readonly customerGroupService: CustomerGroupService) {}

  @Post()
  create(@Body() createCustomerGroupDto: Prisma.customerGroupCreateInput) {
    return this.customerGroupService.create(createCustomerGroupDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.customerGroupUpdateInput,
  ) {
    return this.customerGroupService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerGroupService.remove(+id);
  }
  @Get('active')
  findActive() {
    return this.customerGroupService.findActive();
  }
  @Get('many')
  findMany(@Param('condition') condition: Prisma.customerGroupFindFirstArgs) {
    return this.customerGroupService.findMany(condition);
  }
  @Get(':id')
  findOne(@Param('condition') condition: Prisma.customerGroupFindFirstArgs) {
    return this.customerGroupService.findOne(condition);
  }

  @Get()
  findAll() {
    return this.customerGroupService.findAll();
  }
}
