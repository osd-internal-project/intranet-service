import { PartialType } from '@nestjs/swagger';
import { CreateEmailTemplateTypeDto } from './create-email-template-type.dto';

export class UpdateEmailTemplateTypeDto extends PartialType(CreateEmailTemplateTypeDto) {}
