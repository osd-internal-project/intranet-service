import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerTypeService } from './customer-type.service';
import { Prisma } from '@prisma/client';
@Controller('customer-type')
export class CustomerTypeController {
  constructor(private readonly customerTypeService: CustomerTypeService) {}

  @Post()
  create(@Body() createCustomerTypeDto: Prisma.customerTypeCreateInput) {
    return this.customerTypeService.create(createCustomerTypeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.customerTypeUpdateInput,
  ) {
    return this.customerTypeService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerTypeService.remove(+id);
  }
  @Get('active')
  findActive() {
    return this.customerTypeService.findActive();
  }
  @Get('many')
  findMany(@Param('condition') condition: Prisma.customerTypeFindFirstArgs) {
    return this.customerTypeService.findMany(condition);
  }
  @Get(':id')
  findOne(@Param('condition') condition: Prisma.customerTypeFindFirstArgs) {
    return this.customerTypeService.findOne(condition);
  }

  @Get()
  findAll() {
    return this.customerTypeService.findAll();
  }
}
