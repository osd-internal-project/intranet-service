import { Test, TestingModule } from '@nestjs/testing';
import { UserMapOrganizeController } from './user-map-organize.controller';
import { UserMapOrganizeService } from './user-map-organize.service';

describe('UserMapOrganizeController', () => {
  let controller: UserMapOrganizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMapOrganizeController],
      providers: [UserMapOrganizeService],
    }).compile();

    controller = module.get<UserMapOrganizeController>(UserMapOrganizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
