import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerTypeGroupService } from './customer-type-group.service';
import { Prisma } from '@prisma/client';
@Controller('customer-type-group')
export class CustomerTypeGroupController {
  constructor(
    private readonly customerTypeGroupService: CustomerTypeGroupService,
  ) {}

  @Post()
  create(
    @Body() createCustomerTypeGroupDto: Prisma.customerTypeGroupCreateInput,
  ) {
    return this.customerTypeGroupService.create(createCustomerTypeGroupDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.customerTypeGroupUpdateInput,
  ) {
    return this.customerTypeGroupService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerTypeGroupService.remove(+id);
  }
  @Get('active')
  findActive() {
    return this.customerTypeGroupService.findActive();
  }
  @Get('many')
  findMany(
    @Param('condition') condition: Prisma.customerTypeGroupFindFirstArgs,
  ) {
    return this.customerTypeGroupService.findMany(condition);
  }
  @Get(':id')
  findOne(
    @Param('condition') condition: Prisma.customerTypeGroupFindFirstArgs,
  ) {
    return this.customerTypeGroupService.findOne(condition);
  }

  @Get()
  findAll() {
    return this.customerTypeGroupService.findAll();
  }
}
