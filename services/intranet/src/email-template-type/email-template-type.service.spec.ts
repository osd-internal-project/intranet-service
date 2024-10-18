import { Test, TestingModule } from '@nestjs/testing';
import { EmailTemplateTypeService } from './email-template-type.service';

describe('EmailTemplateTypeService', () => {
  let service: EmailTemplateTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailTemplateTypeService],
    }).compile();

    service = module.get<EmailTemplateTypeService>(EmailTemplateTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
