import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { OrganizedService } from './organized.service';
import { Prisma } from '@prisma/client';
@Controller('organized')
export class OrganizedController {
  constructor(private readonly organizedService: OrganizedService) {}

  @Post('condition')
  findByCondition(@Body('condition') condition: Prisma.organizedFindManyArgs) {
    return this.organizedService.findByCondition(condition);
  }

  @Post()
  async create(@Body('data') data: Prisma.organizedCreateInput) {
    const orgCreated = await this.organizedService.create(data);
    if (orgCreated) {
      const rootGroup = {
        groupName: orgCreated.organizedName,
        description: orgCreated.description,
        organizedGroupId: orgCreated.organizedId,
      };
      const groupCreated = await this.organizedService.createRootGroupUser(
        rootGroup,
      );
      return { organized: orgCreated, geroup: groupCreated };
    } else {
      return orgCreated;
    }
  }

  @Patch()
  async update(
    @Body('organizedId') organizedId: string,
    @Body('data') data: Prisma.organizedUpdateInput,
  ) {
    const orgUpdated = await this.organizedService.update(organizedId, data);
    if (orgUpdated) {
      const rootGroup = {
        groupName: orgUpdated.organizedName,
        description: orgUpdated.description,
      };
      const groupUpdated = await this.organizedService.updateRootGroupUser(
        rootGroup,
      );
      return { organized: orgUpdated, geroup: groupUpdated };
    } else {
      return orgUpdated;
    }
    return this.organizedService.update(organizedId, data);
  }

  @Delete(':organizedId')
  remove(@Param('organizedId') organizedId: string) {
    const detleted = this.organizedService.remove(organizedId);
    if (detleted) {
      this.organizedService.removeRootGroupUser(organizedId);
    }
    return detleted;
  }

  @Get()
  findAll() {
    return this.organizedService.findAll();
  }
}
