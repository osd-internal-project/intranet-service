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
import { handbooktypeService } from './handbooktype.service';
import { Prisma } from '@prisma/client';

@Controller('handbook-type')
export class handbooktypeController {
  constructor(private readonly handbooktypeService: handbooktypeService) {}

  @Post()
  create(@Body() data: Prisma.handbooktypeCreateArgs) {
    return this.handbooktypeService.create(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.handbooktypeService.findAll(query);
  }

  @Get(':idhandtype')
  findOne(@Param('idhandtype') idhandtype: number) {
    return this.handbooktypeService.findOne(+idhandtype);
  }

  @Patch(':idhandtype')
  update(
    @Param('idhandtype') idhandtype: number,
    @Body() condition: Prisma.handbooktypeUpdateArgs,
  ) {
    
    return this.handbooktypeService.update(+idhandtype, condition);
  }

  @Delete(':idhandtype')
  remove(@Param('idhandtype') idhandtype: number) {
    return this.handbooktypeService.remove(+idhandtype);
  }
}
