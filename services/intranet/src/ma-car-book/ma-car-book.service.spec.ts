import { Test, TestingModule } from '@nestjs/testing';
import { MaCarBookService } from './ma-car-book.service';

describe('MaCarBookService', () => {
  let service: MaCarBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaCarBookService],
    }).compile();

    service = module.get<MaCarBookService>(MaCarBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
