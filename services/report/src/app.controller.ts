import { Controller, UseFilters } from '@nestjs/common';
import { AppErrorExceptionFilter } from '@inventory/share';
import { ReportService } from './app.service';

@UseFilters(AppErrorExceptionFilter)
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}
}
