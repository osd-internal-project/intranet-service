import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomerProjectService } from './customer-project.service';
import { Prisma } from '@prisma/client';

@Controller('customer-project')
export class CustomerProjectController {
  constructor(
    private readonly customerProjectService: CustomerProjectService,
  ) {}

  @Post()
  create(@Body() data: Prisma.customerProjectCreateInput) {
    return this.customerProjectService.create(data);
  }

  @Get()
  findAll() {
    return this.customerProjectService.findAll();
  }
  @Get('many')
  findMany(@Query() query: object) {
    console.log(query);
    return this.customerProjectService.findMany({});
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerProjectService.findOneById(+id);
  }
  @Get('/detail/:id')
  findDetailById(@Param('id') id: string) {
    return this.customerProjectService.findDetailById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerProjectDto: Prisma.customerProjectUpdateInput,
  ) {
    return this.customerProjectService.update(+id, updateCustomerProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerProjectService.remove(+id);
  }
}
