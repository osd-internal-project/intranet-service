import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { OrganizeTaskService } from './organize-task.service';
import { Prisma } from '@prisma/client';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('organize-sub-task')
export class OrganizeTaskController {
  constructor(private readonly organizeTaskService: OrganizeTaskService) {}

  // @Post()
  // create(@Body() createOrganizeTaskDto: Prisma.organizeSubTaskCreateInput) {
  //   return this.organizeTaskService.create(createOrganizeTaskDto);
  // }
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(@UploadedFiles() files: Express.Multer.File[], @Body() body: any) {
    return this.organizeTaskService.create(body, files);
  }

  @Get()
  findAll() {
    return this.organizeTaskService.findAll();
  }

  @Post()
  findMany(@Body() condition: Prisma.organizeSubTaskFindManyArgs) {
    return this.organizeTaskService.findMany(condition);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizeTaskService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizeTaskDto: Prisma.organizeSubTaskUpdateInput,
  ) {
    return this.organizeTaskService.update(+id, updateOrganizeTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizeTaskService.remove(+id);
  }
}
