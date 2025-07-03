import { PartialType } from '@nestjs/swagger';
import { CreateReportMaDto } from './create-report-ma.dto';

export class UpdateReportMaDto extends PartialType(CreateReportMaDto) {}
