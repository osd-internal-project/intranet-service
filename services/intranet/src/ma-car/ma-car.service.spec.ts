import { Test, TestingModule } from '@nestjs/testing';
import { MaCarService } from './ma-car.service';

describe('MaCarService', () => {
  let service: MaCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaCarService],
    }).compile();

    service = module.get<MaCarService>(MaCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
