import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaCarBookService } from './ma-car-book.service';
import { Prisma } from '@prisma/client';

@Controller('ma-car-book')
export class MaCarBookController {
  constructor(private readonly maCarBookService: MaCarBookService) {}

  @Post()
  create(@Body() data: Prisma.maCarBookCreateInput) {
    return this.maCarBookService.create(data);
  }

  @Get('fileCheck')
  fileCheck() {
    return this.maCarBookService.findAllfCheck();
  }

  @Get(':skip/:take')
  findMany(@Param('skip') skip: string, @Param('take') take: string) {
    return this.maCarBookService.findMany(+skip, +take);
  }

  @Get(':createdById')
  createdById(@Param('createdById') createdById: string) {
    return this.maCarBookService.createdById(createdById);
  }

  @Get(':id/:skip/:take')
  id(
    @Param('id') id: string,
    @Param('skip') skip: string,
    @Param('take') take: string,
  ) {
    return this.maCarBookService.findManyId(id, +skip, +take);
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.maCarBookService.findManyAllId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.maCarBookUpdateInput) {
    return this.maCarBookService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maCarBookService.remove(+id);
  }
}
