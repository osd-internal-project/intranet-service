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
import { handbookService } from './handbook.service';
import { Prisma } from '@prisma/client';

@Controller('hand-book')
export class handbookController {
  constructor(private readonly handbookService: handbookService) {}

  @Post()
  create(@Body() data: Prisma.handbookCreateArgs) {
    return this.handbookService.create(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.handbookService.findAll(query);
  }

  @Get(':idbook')
  findOne(@Param('idbook') idbook: number) {
    return this.handbookService.findOne(+idbook);
  }

  @Patch(':idbook')
  update(
    @Param('idbook') idbook: number,
    @Body() condition: Prisma.handbookUpdateArgs,
  ) {
    
    return this.handbookService.update(+idbook, condition);
  }

  @Delete(':idbook')
  remove(@Param('idbook') idbook: number) {
    return this.handbookService.remove(+idbook);
  }
}
