import { Controller, UseFilters } from '@nestjs/common';
import { AppErrorExceptionFilter } from '@inventory/share';
import { IntranetService } from './app.service';

@UseFilters(AppErrorExceptionFilter)
@Controller('hr-management')
export class IntranetController {
  constructor(private intranetService: IntranetService) {}
}
