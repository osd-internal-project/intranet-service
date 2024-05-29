import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Logger,
} from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { Prisma } from '@prisma/client';
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  create(@Body('data') data: Prisma.userRoleCreateInput) {
    return this.userRoleService.create(data);
  }

  @Post('create-with-profiles')
  async addProfileWithRules(
    @Body('role') profile: Prisma.userRoleCreateInput,
    @Body('profiles') profiles: string[],
  ) {
    try {
      const created = await this.userRoleService.create(profile);
      if (created) {
        if (profiles.length > 0) {
          const mapRules = profiles.map((profile) => ({
            profileRuleId: profile,
            userRoleId: created.roleId,
          }));
          await this.userRoleService.createRoleProfileMap(mapRules);
        }
      } else {
        throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
        // return this.profileRuleService.findByCondition(condition);
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
    throw new HttpException('UPDATED', HttpStatus.OK);
  }

  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }

  @Post('search')
  findByFilter(@Body('filter') filter: object) {
    const condition = {
      where: filter,
      select: {
        roleId: true,
        roleName: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        roleProfileMap: {
          select: {
            profileRule: {
              select: {
                profileId: true,
                profileName: true,
              },
            },
          },
        },
      },
    } as Prisma.userRoleFindManyArgs;
    return this.userRoleService.findByCondition(condition);
  }

  @Post('condition')
  findByCondition(@Body('condition') condition: Prisma.userRoleFindManyArgs) {
    return this.userRoleService.findByCondition(condition);
  }

  @Post('findrule')
  async findRoleBySetId(@Body('roleId') roleId: string) {
    const data = (await this.userRoleService.findRoleByRoleId(roleId)) as any;

    if (data.length > 0) {
      const names = data.flatMap((item) => item.roleName);
      const roleName = Array.from(new Set([].concat(...names)));
      //Json Object to Array
      const role = data.flatMap((item) =>
        item.roleProfileMap.map((profileRuleItem) =>
          profileRuleItem.profileRule.profileRuleMap.map(
            (masterRuleItem) => masterRuleItem.masterRule.ruleName,
          ),
        ),
      );
      const roleList = Array.from(new Set([].concat(...role)));
      return {
        roleName: roleName,
        ruleList: roleList,
      };
    } else {
      return {
        roleName: '',
        ruleList: [],
      };
    }
  }

  @Patch()
  update(
    @Body('roleId') roleId: string,
    @Body('data') data: Prisma.userRoleUpdateInput,
  ) {
    return this.userRoleService.update(roleId, data);
  }

  @Patch('update-with-profiles')
  updateProfileWithRules(
    @Body('roleId') roleId: string,
    @Body('userRole') userRole: Prisma.userRoleCreateInput,
    @Body('profiles') profiles: string[],
  ) {
    try {
      const mapRules = profiles.map((profile) => ({
        profileRuleId: profile,
      }));
      return this.userRoleService.updateWithProfiles(
        roleId,
        userRole,
        mapRules,
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Delete(':roleId')
  async remove(@Param('roleId') roleId: string) {
    return await this.userRoleService.remove(roleId);
  }
  @Post('setdef')
  async setRole() {
    return this.userRoleService.setRole();
  }
}
