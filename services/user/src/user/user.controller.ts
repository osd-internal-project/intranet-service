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
} from '@nestjs/common';
import { AuthGuard } from '@inventory/share';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MasterRuleService } from 'src/master-rule/master-rule.service';
import { ProfileRuleService } from 'src/profile-rule/profile-rule.service';
import { UserRoleService } from 'src/user-role/user-role.service';
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
  async create(@Body('data') data: Prisma.userCreateInput) {
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
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        data.password.trim(),
        saltOrRounds,
      );
      data.password = hashedPassword;
      return this.userService.create(data);
    }
  }

  @Post('condition')
  @UseGuards(AuthGuard)
  findByCondition(@Body('condition') condition: Prisma.userFindManyArgs) {
    return this.userService.findByCondition(condition);
  }
  @Post('condition-first')
  findOneByCondition(@Body('condition') condition: Prisma.userFindManyArgs) {
    return this.userService.findOneByCondition(condition);
  }

  @Patch()
  update(
    @Body('userId') userId: string,
    @Body('data') data: Prisma.userUpdateInput,
  ) {
    return this.userService.update(userId, data);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.userService.remove(userId);
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

  @Post('set-user-group-map')
  async setUserGroupMap(
    @Body('userId') userId: string,
    @Body('organizedGroupId') organizedGroupId: string,
    @Body('ownerGroupId') ownerGroupId: string,
    @Body('group') group: string[],
  ) {
    if (userId && group) {
      await this.userService.removeUserGroupMapByUserId(
        userId,
        organizedGroupId,
      );
      const ownerCondition = {
        ownerGroupId: ownerGroupId,
      } as Prisma.userUpdateInput;
      await this.userService.update(userId, ownerCondition);

      const mapGroup = group.map((item) => ({
        userId: userId,
        userGroupId: item,
        organizedGroupId: organizedGroupId,
      }));
      return await this.userService.createUserGroupMapByUserId(mapGroup);
    } else {
      throw new HttpException('ผิดพลาด', HttpStatus.BAD_REQUEST);
    }
  }

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
    } as Prisma.userFindFirstArgs;
    return this.userService.findOneByCondition(condition);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('setdef')
  async setUser() {
    await this.masterRuleService.setRule();
    await this.profileRuleService.setProfile();
    await this.userRoleService.setRole();
    return this.userService.setDef();
  }
}
