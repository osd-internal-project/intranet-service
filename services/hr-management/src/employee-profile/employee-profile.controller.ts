import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFiles,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { EmployeeProfileService } from './employee-profile.service';
import { Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { extname } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import config from '../configs';
import { query, Response } from 'express';
import * as fs from 'fs';

const pathMountDirUpload = config().pathMountDirUpload;

@Controller('employee-profile')
export class EmployeeProfileController {
  constructor(
    private readonly employeeProfileService: EmployeeProfileService,
  ) {}

  @Post()
  create(@Body() createEmployeeProfile: Prisma.employeeProfilesCreateInput) {
    return this.employeeProfileService.create(createEmployeeProfile);
  }

  @Post('/upload-image/:userId')
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: `${pathMountDirUpload}/users-image`,
        filename: (req, file, callback) => {
          const fileCode = `${uuidv4()}`;
          const fileType = extname(file.originalname);
          callback(null, `${fileCode}${fileType}`);
        },
      }),
    }),
  )
  async uploadImage(
    @Param('userId') userId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.employeeProfileService.uploadImags(userId, files[0]);
  }

  @Get()
  findAll() {
    return this.employeeProfileService.findAll();
  }

  @Get('count')
  count(@Query() query: any) {
    return this.employeeProfileService.count(query);
  }

  @Get('/upload-image/:userId')
  async getimage(@Param('userId') userId: any, @Res() res: Response) {
    const { imageId } = await this.employeeProfileService.findOne(userId);

    let imagePath;
    if (imageId === null) {
      imagePath = join(`${pathMountDirUpload}/default`, `emp-avatar.png`);
    } else {
      imagePath = join(`${pathMountDirUpload}/users-image`, `${imageId}`);
    }
    if (!fs.existsSync(imagePath)) {
      imagePath = join(`${pathMountDirUpload}/default`, `emp-avatar.png`);
    }

    console.log(imagePath);
    
    res.sendFile(`${imagePath}`, { root: './' });
  }

  @Get(':take/:skip')
  findByCondition(@Param('take') take: string, @Param('skip') skip: string) {
    return this.employeeProfileService.findMany(+take, +skip);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.employeeProfileService.findOne(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeProfile: Prisma.employeeProfilesUpdateInput,
  ) {
    return this.employeeProfileService.update(+id, updateEmployeeProfile);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeProfileService.remove(+id);
  }
}
