import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaVehicleTypeService } from './ma-vehicle-type.service';
import { Prisma } from '@prisma/client';

@Controller('ma-vehicle-type')
export class MaVehicleTypeController {
  constructor(private readonly maVehicleTypeService: MaVehicleTypeService) {}

  @Post()
  create(@Body() data: Prisma.maVehicleTypeCreateInput) {
    return this.maVehicleTypeService.create(data);
  }

  @Get()
  findAll() {
    return this.maVehicleTypeService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.maVehicleTypeUpdateInput) {
    return this.maVehicleTypeService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maVehicleTypeService.remove(+id);
  }
}
