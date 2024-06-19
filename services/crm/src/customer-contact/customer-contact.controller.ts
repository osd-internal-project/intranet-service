import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerContactService } from './customer-contact.service';
import { Prisma } from '@prisma/client';

@Controller('customer-contact')
export class CustomerContactController {
  constructor(
    private readonly customerContactService: CustomerContactService,
  ) {}

  @Post()
  create(@Body() data: Prisma.customerContactCreateInput) {
    return this.customerContactService.create(data);
  }

  @Get()
  findAll() {
    return this.customerContactService.findAll();
  }
  @Get('many')
  findMany(condition: Prisma.customerContactFindManyArgs) {
    return this.customerContactService.findMany(condition);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerContactService.findOneById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerContactDto: Prisma.customerContactUpdateInput,
  ) {
    return this.customerContactService.update(+id, updateCustomerContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerContactService.remove(+id);
  }
}
