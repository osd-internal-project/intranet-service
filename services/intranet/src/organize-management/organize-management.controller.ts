import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.organizeManagementService.findAll();
  }

  @Post('data-table')
  findMany(@Body() condition: Prisma.organizeManagementFindManyArgs) {
    return this.organizeManagementService.findMany(condition);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizeManagementService.findOne(+id);
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
