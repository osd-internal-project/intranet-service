import { Test, TestingModule } from '@nestjs/testing';
import { MaCarBookingImagesController } from './ma-car-booking-images.controller';
import { MaCarBookingImagesService } from './ma-car-booking-images.service';

describe('MaCarBookingImagesController', () => {
  let controller: MaCarBookingImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaCarBookingImagesController],
      providers: [MaCarBookingImagesService],
    }).compile();

    controller = module.get<MaCarBookingImagesController>(
      MaCarBookingImagesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
