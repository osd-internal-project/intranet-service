import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComplainProblemService } from './complain-problem.service';
import { Prisma } from '@prisma/client';

@Controller('complain-problem')
export class ComplainProblemController {
  constructor(
    private readonly complainProblemService: ComplainProblemService,
  ) {}

  @Post()
  create(@Body() createComplainProblemDto: Prisma.complainProblemCreateInput) {
    return this.complainProblemService.create(createComplainProblemDto);
  }

  @Get()
  findAll() {
    return this.complainProblemService.findAll();
  }

  @Get('find-many/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.complainProblemService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complainProblemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComplainProblemDto: Prisma.complainProblemUpdateInput,
  ) {
    return this.complainProblemService.update(+id, updateComplainProblemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complainProblemService.remove(+id);
  }
}
