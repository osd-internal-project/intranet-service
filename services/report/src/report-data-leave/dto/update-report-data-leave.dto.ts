import { PartialType } from '@nestjs/swagger';
import { CreateReportDataLeaveDto } from './create-report-data-leave.dto';

export class UpdateReportDataLeaveDto extends PartialType(CreateReportDataLeaveDto) {}
