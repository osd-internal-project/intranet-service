import { Test, TestingModule } from '@nestjs/testing';
import { MaCarBookingImagesService } from './ma-car-booking-images.service';

describe('MaCarBookingImagesService', () => {
  let service: MaCarBookingImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaCarBookingImagesService],
    }).compile();

    service = module.get<MaCarBookingImagesService>(MaCarBookingImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
