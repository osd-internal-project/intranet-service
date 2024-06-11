import { Test, TestingModule } from '@nestjs/testing';
import { UserMapOrganizeService } from './user-map-organize.service';

describe('UserMapOrganizeService', () => {
  let service: UserMapOrganizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMapOrganizeService],
    }).compile();

    service = module.get<UserMapOrganizeService>(UserMapOrganizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
