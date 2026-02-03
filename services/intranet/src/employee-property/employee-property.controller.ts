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
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { EmployeePropertyService } from './employee-property.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('employee-property')
export class EmployeePropertyController {
  constructor(
    private readonly employeePropertyService: EmployeePropertyService,
  ) {}

  // @Post()
  // create(
  //   @Body() createEmployeePropertyDto: Prisma.employeePropertyCreateInput,
  // ) {
  //   return this.employeePropertyService.create(createEmployeePropertyDto);
  // }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('items') items: string,
  ) {
    const parsedItems = JSON.parse(items);

    return this.employeePropertyService.create(parsedItems, files);
  }

  @Get()
  findAll() {
    return this.employeePropertyService.findAll();
  }

  @Get('find-many/:userId')
  findMany(@Query() query: any, @Param('userId') userId: string) {
    return this.employeePropertyService.findMany(userId, query);
  }

  @Get('find-teams/:userId')
  findManyTeams(@Query() query: any, @Param('userId') userId: string) {
    return this.employeePropertyService.findManyTeams(userId, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeePropertyService.findOne(id);
  }

  @Patch(':id')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: number,
    @Body() dto: Prisma.employeePropertyUpdateInput,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.employeePropertyService.update(+id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeePropertyService.remove(+id);
  }
}
