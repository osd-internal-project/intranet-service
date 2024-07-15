import { Test, TestingModule } from '@nestjs/testing';
import { MaCarWrapupService } from './ma-car-wrapup.service';

describe('MaCarWrapupService', () => {
  let service: MaCarWrapupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaCarWrapupService],
    }).compile();

    service = module.get<MaCarWrapupService>(MaCarWrapupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
