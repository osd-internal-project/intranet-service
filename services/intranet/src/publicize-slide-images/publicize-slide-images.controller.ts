import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicizeSlideImagesService } from './publicize-slide-images.service';
import { CreatePublicizeSlideImageDto } from './dto/create-publicize-slide-image.dto';
import { UpdatePublicizeSlideImageDto } from './dto/update-publicize-slide-image.dto';

@Controller('publicize-slide-images')
export class PublicizeSlideImagesController {
  constructor(private readonly publicizeSlideImagesService: PublicizeSlideImagesService) {}

  @Post()
  create(@Body() createPublicizeSlideImageDto: CreatePublicizeSlideImageDto) {
    return this.publicizeSlideImagesService.create(createPublicizeSlideImageDto);
  }

  @Get()
  findAll() {
    return this.publicizeSlideImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicizeSlideImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicizeSlideImageDto: UpdatePublicizeSlideImageDto) {
    return this.publicizeSlideImagesService.update(+id, updatePublicizeSlideImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicizeSlideImagesService.remove(+id);
  }
}
