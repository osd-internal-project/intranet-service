import { Injectable } from '@nestjs/common';
import { CreatePublicizeSlideImageDto } from './dto/create-publicize-slide-image.dto';
import { UpdatePublicizeSlideImageDto } from './dto/update-publicize-slide-image.dto';

@Injectable()
export class PublicizeSlideImagesService {
  create(createPublicizeSlideImageDto: CreatePublicizeSlideImageDto) {
    return 'This action adds a new publicizeSlideImage';
  }

  findAll() {
    return `This action returns all publicizeSlideImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicizeSlideImage`;
  }

  update(id: number, updatePublicizeSlideImageDto: UpdatePublicizeSlideImageDto) {
    return `This action updates a #${id} publicizeSlideImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicizeSlideImage`;
  }
}
