import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { ProfileRuleService } from './profile-rule.service';
import { Prisma } from '@prisma/client';
@Controller('profile-rule')
export class ProfileRuleController {
  constructor(private readonly profileRuleService: ProfileRuleService) {}

  @Post()
  create(@Body('data') data: Prisma.profileRuleCreateInput) {
    return this.profileRuleService.create(data);
  }

  @Post('create-with-rules')
  async addProfileWithRules(
    @Body('profile') profile: Prisma.profileRuleCreateInput,
    @Body('rules') rules: string[],
  ) {
    try {
      const created = await this.profileRuleService.create(profile);
      if (created) {
        const mapRules = rules.map((rule) => ({
          masterRuleId: rule,
          profileRuleId: created.profileId,
        }));
        await this.profileRuleService.createProfileRuleMap(mapRules);
      } else {
        throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
        // return this.profileRuleService.findByCondition(condition);
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
    throw new HttpException('CREATED', HttpStatus.CREATED);
  }

  @Get()
  findAll() {
    return this.profileRuleService.findAll();
  }

  @Post('search-one')
  findOneByFilter(@Body('filter') filter: object) {
    const condition = {
      where: filter,
      select: {
        profileId: true,
        profileName: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        profileRuleMap: {
          select: {
            masterRule: {
              select: {
                ruleCode: true,
                ruleName: true,
              },
            },
          },
        },
      },
    } as Prisma.profileRuleFindManyArgs;
    return this.profileRuleService.findOneByCondition(condition);
  }

  @Post('search-many')
  findByFilter(@Body('filter') filter: object) {
    const condition = {
      where: filter,
      select: {
        profileId: true,
        profileName: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        profileRuleMap: {
          select: {
            masterRule: {
              select: {
                ruleCode: true,
                ruleName: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    } as Prisma.profileRuleFindManyArgs;
    return this.profileRuleService.findByCondition(condition);
  }

  @Post('condition')
  findByCondition(
    @Body('condition') condition: Prisma.profileRuleFindManyArgs,
  ) {
    return this.profileRuleService.findByCondition(condition);
  }

  @Patch()
  update(
    @Body('profileId') profileId: string,
    @Body('data') data: Prisma.profileRuleUpdateInput,
  ) {
    return this.profileRuleService.update(profileId, data);
  }

  @Patch('update-with-rules')
  async updateProfileWithRules(
    @Body('profileId') profileId: string,
    @Body('profile') profile: Prisma.profileRuleCreateInput,
    @Body('rules') rules: string[],
  ) {
    try {
      await this.profileRuleService.update(profileId, profile);

      await this.profileRuleService.removeProfileRuleMapByProfile(profileId);
      if (rules.length > 0) {
        const mapRules = rules.map((rule) => ({
          masterRuleId: rule,
          profileRuleId: profileId,
        }));
        await this.profileRuleService.createProfileRuleMap(mapRules);
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
    throw new HttpException('CREATED', HttpStatus.CREATED);
  }

  @Delete(':profileId')
  async remove(@Param('profileId') profileId: string) {
    await this.profileRuleService.removeRoleProfileMapByProfile(profileId);
    await this.profileRuleService.removeProfileRuleMapByProfile(profileId);
    return await this.profileRuleService.remove(profileId);
  }

  @Post('setdef')
  async setprofile() {
    return this.profileRuleService.setProfile();
  }
}
