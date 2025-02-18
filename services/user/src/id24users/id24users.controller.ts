import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { UsersService } from './id24users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdCheckingData } from 'src/id24/id24.service';
import { UserType } from './type';
import { UserInterceptor } from '@inventory/share';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import configs from 'src/configs';
import * as fs from 'fs';
const config = configs();

@Controller('id24users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.usersService.findAll(query);
  }

  @Post('check-id')
  // @UseInterceptors(UserInterceptor)
  validateCheck(
    @Body()
    body: IdCheckingData,
    @Req() req: any,
  ) {
    const token = req.body.sub;
    return this.usersService.validateCheck(body);
  }

  @Post(':userId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/users-image`,
        filename: (req, file, callback) => {
          const fileCode = `${uuidv4()}`;
          const fileType = extname(file.originalname);
          callback(null, `${fileCode}${fileType}`);
        },
      }),
    }),
  )
  async creatUserProfile(
    @Param('userId') userId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('type') type,
  ) {
    if (userId && type && files.length > 0) {
      return this.usersService.updateImage(userId, files[0].filename);
    }
  }

  @Post('validate/email')
  // @UseInterceptors(UserInterceptor)
  async validateEmail(@Body('email') email: string) {
    return this.usersService.validateEmail(email);
  }

  @Post('validate/username')
  // @UseInterceptors(UserInterceptor)
  async validateUserName(
    @Body('username') username: string,
    @Body('type') type: UserType.LDAP | UserType.Local,
  ) {
    return this.usersService.validateUserName(username, type);
  }

  @Post('validate/password')
  // @UseInterceptors(UserInterceptor)
  validatePassword(@Body('password') password: string) {
    return this.usersService.validatePassword(password);
  }

  @Get('getImages')
  @UseInterceptors(UserInterceptor)
  async getimages(@Res() res: Response, @Req() req: any) {
    const token = req.body.sub;
    const user = await this.usersService.findByToken(token);
    let imagePath = '';
    if (!user.imageId) {
      return res.status(404).json({ message: 'Image not found' });
    }
    imagePath = join(
      `${config.pathMountDirUpload}/users-image`,
      `${user.imageId}`,
    );
    if (!fs.existsSync(imagePath)) {
      imagePath = join(
        `${config.pathMountDirUpload}/default`,
        `emp-avatar.png`,
      );
    }
    return await res.sendFile(imagePath, { root: './' });
  }

  @Get('findByToken')
  @UseInterceptors(UserInterceptor)
  findByToken(@Req() req: any) {
    const token = req.body.sub;
    return this.usersService.findByToken(token);
  }

  @Get('groups')
  // @UseInterceptors(UserInterceptor)
  getGroups() {
    return this.usersService.getGroups();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
