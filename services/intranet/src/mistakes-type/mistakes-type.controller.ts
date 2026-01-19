import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MistakesTypeService } from './mistakes-type.service';
import { Prisma } from '@prisma/client';

@Controller('mistakes-type')
export class MistakesTypeController {
  constructor(private readonly mistakesTypeService: MistakesTypeService) {}

  @Post()
  create(@Body() createMistakesTypeDto: Prisma.mistakesTypeCreateInput) {
    return this.mistakesTypeService.create(createMistakesTypeDto);
  }

  @Get()
  findAll() {
    return this.mistakesTypeService.findAll();
  }

  @Get('find-by-userId/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.mistakesTypeService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mistakesTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMistakesTypeDto: Prisma.mistakesTypeUpdateInput,
  ) {
    return this.mistakesTypeService.update(+id, updateMistakesTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mistakesTypeService.remove(+id);
  }
}
