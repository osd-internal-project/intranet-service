import { PartialType } from '@nestjs/swagger';
import { CreateReportOtDto } from './create-report-ot.dto';

export class UpdateReportOtDto extends PartialType(CreateReportOtDto) {}
