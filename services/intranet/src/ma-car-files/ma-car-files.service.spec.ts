import { Test, TestingModule } from '@nestjs/testing';
import { MaCarFilesService } from './ma-car-files.service';

describe('MaCarFilesService', () => {
  let service: MaCarFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaCarFilesService],
    }).compile();

    service = module.get<MaCarFilesService>(MaCarFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
