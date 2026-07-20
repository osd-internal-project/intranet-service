import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaVehicleTypeGroupService } from './ma-vehicle-type-group.service';
import { Prisma } from '@prisma/client';

@Controller('ma-vehicle-type-group')
export class MaVehicleTypeGroupController {
  constructor(
    private readonly maVehicleTypeGroupService: MaVehicleTypeGroupService,
  ) {}

  @Post()
  create(@Body() data: Prisma.maVehicleTypeGroupCreateInput) {
    return this.maVehicleTypeGroupService.create(data);
  }

  @Get()
  findAll() {
    return this.maVehicleTypeGroupService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.maVehicleTypeGroupUpdateInput,
  ) {
    return this.maVehicleTypeGroupService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maVehicleTypeGroupService.remove(+id);
  }
}
