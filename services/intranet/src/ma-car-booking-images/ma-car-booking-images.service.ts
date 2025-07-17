import { Injectable } from '@nestjs/common';
import { CreateMaCarBookingImageDto } from './dto/create-ma-car-booking-image.dto';
import { UpdateMaCarBookingImageDto } from './dto/update-ma-car-booking-image.dto';
import { MaCarBookingImageRepository } from '@inventory/share';

@Injectable()
export class MaCarBookingImagesService {
  constructor(
    private readonly macarbookinimagesRepo: MaCarBookingImageRepository,
  ) {}
  create(createMaCarBookingImageDto: CreateMaCarBookingImageDto) {
    const base = { data: createMaCarBookingImageDto };
    return this.macarbookinimagesRepo.create(base);
  }

  findAll() {
    return `This action returns all maCarBookingImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maCarBookingImage`;
  }

  update(id: number, updateMaCarBookingImageDto: UpdateMaCarBookingImageDto) {
    return `This action updates a #${id} maCarBookingImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} maCarBookingImage`;
  }
}
