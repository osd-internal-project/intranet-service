import { PartialType } from '@nestjs/swagger';
import { CreateEmailTemplateFieldDto } from './create-email-template-field.dto';

export class UpdateEmailTemplateFieldDto extends PartialType(CreateEmailTemplateFieldDto) {}
