import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MasterProductService } from './master-product.service';
import { CreateMasterProductDto } from './dto/create-master-product.dto';
import { UpdateMasterProductDto } from './dto/update-master-product.dto';

@Controller('master-product')
export class MasterProductController {
  constructor(private readonly masterProductService: MasterProductService) {}

  @Post()
  create(@Body() createMasterProductDto: CreateMasterProductDto) {
    return this.masterProductService.create(createMasterProductDto);
  }

  @Get()
  findAll() {
    return this.masterProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterProductService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterProductDto: UpdateMasterProductDto,
  ) {
    return this.masterProductService.update(+id, updateMasterProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterProductService.remove(+id);
  }
}
