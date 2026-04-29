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
import { OrganizeManagementService } from './organize-management.service';
import { Prisma } from '@prisma/client';
@Controller('organize-management')
export class OrganizeManagementController {
  constructor(
    private readonly organizeManagementService: OrganizeManagementService,
  ) {}

  @Post()
  create(
    @Body() createOrganizeManagementDto: Prisma.organizeManagementCreateInput,
  ) {
    return this.organizeManagementService.create(createOrganizeManagementDto);
  }

  // @Post()
  // @UseInterceptors(AnyFilesInterceptor())
  // create(@UploadedFiles() files: Express.Multer.File[], @Body() body: any) {
  //   return this.organizeManagementService.create(body, files);
  // }

  @Post('data-table')
  findMany(@Body() condition: Prisma.organizeManagementFindManyArgs) {
    return this.organizeManagementService.findMany(condition);
  }

  @Get()
  findAll() {
    return this.organizeManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizeManagementService.findOne(+id);
  }

  @Get('download/:fileName')
  async download(@Param('fileName') fileName: string, @Res() res: Response) {
    const bucket = 'organize-bucket';
    const stream = await this.organizeManagementService.getFile(
      bucket,
      fileName,
    );
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(
        fileName,
      )}"`,
    });

    stream.pipe(res);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizeManagementDto: Prisma.organizeManagementUpdateInput,
  ) {
    return this.organizeManagementService.update(
      +id,
      updateOrganizeManagementDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizeManagementService.remove(+id);
  }
}
