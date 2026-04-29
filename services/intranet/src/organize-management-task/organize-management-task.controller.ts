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
import { organizeManagementTaskService } from './organize-management-task.service';
import { Prisma } from '@prisma/client';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('organize-management-task')
export class OrganizeManagementTaskController {
  constructor(
    private readonly organizeManagementtaskService: organizeManagementTaskService,
  ) {}

  // @Post()
  // create(
  //   @Body()
  //   createOrganizeManagementDto: Prisma.organizeManagementTaskCreateInput,
  // ) {
  //   return this.organizeManagementtaskService.create(
  //     createOrganizeManagementDto,
  //   );
  // }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(@UploadedFiles() files: Express.Multer.File[], @Body() body: any) {
    return this.organizeManagementtaskService.create(body, files);
  }

  @Get()
  findAll() {
    return this.organizeManagementtaskService.findAll();
  }

  @Post('data-table')
  findMany(@Body() condition: Prisma.organizeManagementTaskFindManyArgs) {
    return this.organizeManagementtaskService.findMany(condition);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const base = {
      where: {
        organizeManagementId: +id,
      },
    };
    return this.organizeManagementtaskService.findMany(base);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body()
  //   updateOrganizeManagementDto: Prisma.organizeManagementTaskUpdateInput,
  // ) {
  //   return this.organizeManagementtaskService.update(
  //     +id,
  //     updateOrganizeManagementDto,
  //   );
  // }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    return this.organizeManagementtaskService.update(body, files, +id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizeManagementtaskService.remove(+id);
  }
}
