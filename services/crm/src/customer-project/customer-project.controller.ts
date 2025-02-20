import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { CustomerProjectService } from './customer-project.service';
import { Prisma } from '@prisma/client';
import { UserInterceptor } from '@inventory/share';

@Controller('customer-project')
export class CustomerProjectController {
  constructor(
    private readonly customerProjectService: CustomerProjectService,
  ) {}

  @Post()
  create(
    @Body('data') data: Prisma.customerProjectCreateInput,
    @Body('productDetails')
    productDetails: Prisma.customerProjectProductMapCreateManyCustomerProjectInput[],
  ) {
    return this.customerProjectService.create(data, productDetails);
  }

  @Get()
  findAll() {
    return this.customerProjectService.findAll();
  }
  @Get('many')
  findMany(@Query() query: object) {
    return this.customerProjectService.findMany({});
  }
  @Get('data-table')
  @UseInterceptors(UserInterceptor)
  findDatatable(@Query() query: any, @Req() req) {
    return this.customerProjectService.findDatatable(query, req.body.sub);
  }
  @Get('/detail/:id')
  findDetailById(@Param('id') id: string) {
    return this.customerProjectService.findDetailById(+id);
  }
  @Get('/find-by-productid-and-parent/')
  findProjectsByProductIdAndParentId(
    @Query('productid') productId: string,
    @Query('parentid') parentId: string,
    @Query('type') type: string,
  ) {
    return this.customerProjectService.findProjectsByProductIdAndParentId(
      +productId,
      +parentId,
      type,
    );
  }
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerProjectService.findOneById(+id);
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
