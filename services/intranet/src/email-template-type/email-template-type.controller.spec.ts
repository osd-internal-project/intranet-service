import { Test, TestingModule } from '@nestjs/testing';
import { EmailTemplateTypeController } from './email-template-type.controller';
import { EmailTemplateTypeService } from './email-template-type.service';

describe('EmailTemplateTypeController', () => {
  let controller: EmailTemplateTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailTemplateTypeController],
      providers: [EmailTemplateTypeService],
    }).compile();

    controller = module.get<EmailTemplateTypeController>(EmailTemplateTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
