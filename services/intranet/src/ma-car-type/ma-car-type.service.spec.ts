import { Test, TestingModule } from '@nestjs/testing';
import { MaCarTypeService } from './ma-car-type.service';

describe('MaCarTypeService', () => {
  let service: MaCarTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaCarTypeService],
    }).compile();

    service = module.get<MaCarTypeService>(MaCarTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
