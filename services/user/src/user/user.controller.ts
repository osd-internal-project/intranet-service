import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Param,
  Logger,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Req,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@inventory/share';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MasterRuleService } from 'src/master-rule/master-rule.service';
import { ProfileRuleService } from 'src/profile-rule/profile-rule.service';
import { UserRoleService } from 'src/user-role/user-role.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { extname } from 'path';
import config from '../configs';
import { query, Response } from 'express';
import * as fs from 'fs';

const pathMountDirUpload = config().pathMountDirUpload;

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly masterRuleService: MasterRuleService,
    private readonly profileRuleService: ProfileRuleService,
    private readonly userRoleService: UserRoleService,
  ) {}

  // @Post()
  // async create(@Body('data') data: Prisma.userCreateInput) {
  //   const saltOrRounds = 10;
  //   const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
  //   data.password = hashedPassword;
  //   return this.userService.create(data);
  // }

  @Post()
  async create(@Body('data') data: Prisma.usersCreateInput) {
    const checkuser = await this.userService.findOneByCondition({
      where: {
        username: data.username.trim(),
      },
    });

    if (checkuser) {
      throw new HttpException(
        'Username ไม่สามารถใช้งานได้',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      // const saltOrRounds = 10;
      // const hashedPassword = await bcrypt.hash(
      //   data.password.trim(),
      //   saltOrRounds,
      // );
      // data.password = hashedPassword;
      return this.userService.create(data);
    }
  }

  @Post('condition')
  @UseGuards(AuthGuard)
  findByCondition(
    @Body('condition') condition: Prisma.usersFindManyArgs,
    @Req() req,
  ) {
    const userId = req.user.userId;
    return this.userService.findByCondition(condition, userId);
  }

  @Post('condition-first')
  findOneByCondition(@Body('condition') condition: Prisma.usersFindManyArgs) {
    return this.userService.findOneByCondition(condition);
  }

  @Post('condition-user-header/:userId')
  findByUserPermissionCondition(
    @Body('condition') condition: Prisma.usersFindManyArgs,
    @Param('userId') userId: Prisma.usersFindManyArgs,
  ) {
    return this.userService.findByUserPermissionCondition(userId, condition);
  }
  @Post('users-in-owner-groups')
  findUsersInOnwerGroups(@Body('groups') userGroupIds: string[]) {
    return this.userService.findUsersInOnwerGroups(userGroupIds);
  }
  @Post('assign-groups/:userId')
  assignGroups(
    @Param('userId') userId: string,
    @Body()
    createRuleDto: {
      organizeId?: string;
      groups?: string[];
    },
  ) {
    return this.userService.assignGroups(userId, createRuleDto);
  }

  @Post('assign_owner_groups/:userId')
  assignOwnerGroups(
    @Param('userId') userId: string,
    @Body()
    createRuleDto: {
      organizeId?: string;
      groupOwnerId?: string;
    },
  ) {
    return this.userService.assignOwnerGroups(userId, createRuleDto);
  }

  @Post('set-user-roles-map')
  async setUserRolesMap(
    @Body('userId') userId: string,
    @Body('roles') roles: string[],
  ) {
    if (userId && roles) {
      await this.userService.removeUserRoleMapByUserId(userId);
      const mapRoles = roles.map((role) => ({
        userId: userId,
        userRoleId: role,
      }));
      return await this.userService.createUserRoleMapByUserId(mapRoles);
    } else {
      throw new HttpException('ผิดพลาด', HttpStatus.BAD_REQUEST);
    }
  }

  // @Post('set-user-group-map')
  // async setUserGroupMap(
  //   @Body('userId') userId: string,
  //   @Body('organizedGroupId') organizedGroupId: string,
  //   @Body('ownerGroupId') ownerGroupId: string,
  //   @Body('group') group: string[],
  // ) {
  //   if (userId && group) {
  //     await this.userService.removeUserGroupMapByUserId(
  //       userId,
  //       organizedGroupId,
  //     );
  //     const ownerCondition = {
  //       ownerGroupId: ownerGroupId,
  //     } as Prisma.usersUpdateInput;
  //     await this.userService.update(userId, ownerCondition);

  //     const mapGroup = group.map((item) => ({
  //       userId: userId,
  //       userGroupId: item,
  //       organizedGroupId: organizedGroupId,
  //     }));
  //     return await this.userService.createUserGroupMapByUserId(mapGroup);
  //   } else {
  //     throw new HttpException('ผิดพลาด', HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Post('/find-duplicate-username')
  findDuplicateUserame(
    @Body('userId') userId: string,
    @Body('username') username: string,
  ) {
    const condition = {
      where: {
        userId: {
          not: {
            equals: userId,
          },
        },
        username: username.trim(),
      },
    } as Prisma.usersFindFirstArgs;
    return this.userService.findOneByCondition(condition);
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
    const { imageId } = await this.userService.findByUserId(userId);
    const imagePath = join(`${pathMountDirUpload}/users-image`, `${imageId}`);
    if (imageId !== null) {
      fs.unlink(imagePath, (err) => {
        return err;
      });
      await this.userService.update(userId, { imageId: null });
    }
    return this.userService.uploadImags(userId, files[0]);
  }

  @Post('set-defualt-admin')
  async setUser() {
    const rules = await this.masterRuleService.setRule();
    Logger.debug(rules);
    const ruleGroup = await this.profileRuleService.setProfile();
    Logger.debug(ruleGroup);
    const roles = await this.userRoleService.setRole();
    Logger.debug(roles);
    return this.userService.setDef();
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('assign-owner-groups/:userId/:organizeId')
  findAssignOwnerGroups(
    @Param('userId') userId: string,
    @Param('organizeId') organizeId: string,
  ) {
    return this.userService.findAssignOwnerGroups(userId, organizeId);
  }

  @Get('assign-groups/:userId/:organizeId')
  findAssignGroups(
    @Param('userId') userId: string,
    @Param('organizeId') organizeId: string,
  ) {
    return this.userService.findAssignGroups(userId, organizeId);
  }

  @Get('/upload-image/:userId')
  async getimage(@Param('userId') userId: any, @Res() res: Response) {
    const user = await this.userService.findByUserId(userId);
    let imagePath;
    if (!user?.imageId) {
      imagePath = join(`${pathMountDirUpload}/default`, `emp-avatar.png`);
    } else {
      imagePath = join(`${pathMountDirUpload}/users-image`, `${user?.imageId}`);
    }
    if (!fs.existsSync(imagePath)) {
      imagePath = join(`${pathMountDirUpload}/default`, `emp-avatar.png`);
    }
    res.sendFile(`${imagePath}`, { root: './' });
  }

  @Get('find-owner-users/:positionId')
  dOwnerUserByPositionId(@Param('positionId') positionId: string) {
    return this.userService.findOwnerUserByPositionId(positionId);
  }

  @Get('find-organize-user-by-userid/:userid')
  findOrganizeuserByUserid(@Param('userId') userId: string) {
    return this.userService.findOrganizeuserByUserid(userId);
  }
  // @Get('find-sale-user-by-sale-permission/:userid')
  // findSaleUserBySalePermission(@Param('userid') userId: string) {
  //   return this.userService.findSaleUserBySalePermission(userId);
  // }
  @Get('find-same-and-lower-users-by-ownergroup')
  findUsersSameAndLowersByOwnergroup(
    @Query() group: { [key: string]: string },
  ) {
    return this.userService.findUsersSameAndLowersByOwnergroup(group);
  }
  @Get('user-in-owner-group/:usergroupid')
  findUserInOnwerGroupByUserGroupId(@Param('usergroupid') userGroupId: string) {
    return this.userService.findUserInOnwerGroupByUserGroupId(userGroupId);
  }

  // @Get('header-user-by-userid/:userid')
  // // @UseInterceptors(UserInterceptor)
  // async findHeaderUserByUserId(@Param('userid') userId: string) {
  //   return await this.userService.findHeaderUserByUserId(userId);
  // }

  @Patch()
  update(
    @Body('userId') userId: string,
    @Body('data') data: Prisma.usersUpdateInput,
  ) {
    return this.userService.update(userId, data);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.userService.remove(userId);
  }
}
