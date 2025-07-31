import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MasterProductImageService } from './master-product-image.service';
import { CreateMasterProductImageDto } from './dto/create-master-product-image.dto';
import { UpdateMasterProductImageDto } from './dto/update-master-product-image.dto';

@Controller('master-product-image')
export class MasterProductImageController {
  constructor(private readonly masterProductImageService: MasterProductImageService) {}

  @Post()
  create(@Body() createMasterProductImageDto: CreateMasterProductImageDto) {
    return this.masterProductImageService.create(createMasterProductImageDto);
  }

  @Get()
  findAll() {
    return this.masterProductImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterProductImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterProductImageDto: UpdateMasterProductImageDto) {
    return this.masterProductImageService.update(+id, updateMasterProductImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterProductImageService.remove(+id);
  }
}
