import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MasterProvinceThailandService } from './master-province-thailand.service';
import { CreateMasterProvinceThailandDto } from './dto/create-master-province-thailand.dto';
import { UpdateMasterProvinceThailandDto } from './dto/update-master-province-thailand.dto';
import type { Prisma } from '@prisma/client';

@Controller('master-province-thailand')
export class MasterProvinceThailandController {
  constructor(
    private readonly masterProvinceThailandService: MasterProvinceThailandService,
  ) {}

  @Post()
  create(
    @Body()
    createMasterProvinceThailandDto: Prisma.masterProvinceThailandCreateInput,
  ) {
    return this.masterProvinceThailandService.create(
      createMasterProvinceThailandDto,
    );
  }

  @Get()
  findAll() {
    return this.masterProvinceThailandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterProvinceThailandService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterProvinceThailandDto: UpdateMasterProvinceThailandDto,
  ) {
    return this.masterProvinceThailandService.update(
      +id,
      updateMasterProvinceThailandDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterProvinceThailandService.remove(+id);
  }
}
