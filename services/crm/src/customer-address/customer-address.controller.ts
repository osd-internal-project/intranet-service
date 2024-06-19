import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerAddressService } from './customer-address.service';
import { Prisma } from '@prisma/client';

@Controller('customer-address')
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService,
  ) {}

  @Post()
  create(@Body() data: Prisma.customerAddressCreateInput) {
    return this.customerAddressService.create(data);
  }

  @Get()
  findAll() {
    return this.customerAddressService.findAll();
  }
  @Get('many')
  findMany(condition: Prisma.customerAddressFindManyArgs) {
    return this.customerAddressService.findMany(condition);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerAddressService.findOneById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerAddressDto: Prisma.customerAddressUpdateInput,
  ) {
    return this.customerAddressService.update(+id, updateCustomerAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerAddressService.remove(+id);
  }
}
