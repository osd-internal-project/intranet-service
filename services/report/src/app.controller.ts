import { Controller, UseFilters } from '@nestjs/common';
import { AppErrorExceptionFilter } from '@inventory/share';
import { EvoteService } from './app.service';

@UseFilters(AppErrorExceptionFilter)
@Controller('inventory')
export class EvoteController {
  constructor(private evoteService: EvoteService) {}
}
