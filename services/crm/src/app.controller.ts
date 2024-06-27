import { Controller, UseFilters } from '@nestjs/common';
import { AppErrorExceptionFilter } from '@inventory/share';
import { IntranetService } from './app.service';

@UseFilters(AppErrorExceptionFilter)
@Controller('intranet')
export class IntranetController {
  constructor(private intranetService: IntranetService) {}
}
