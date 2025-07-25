import { Controller, Get, Query, Res } from '@nestjs/common';
import { ReportDataLeaveService } from './report-data-leave.service';
import { Response } from 'express';

@Controller('report-data-leave')
export class ReportDataLeaveController {
  constructor(
    private readonly reportDataLeaveService: ReportDataLeaveService,
  ) {}

  @Get('export')
  async export(
    @Query()
    query: { type: string; value: string },
    @Res() res: Response,
  ) {
    try {
      const buffer = await this.reportDataLeaveService.export(query);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
      res.setHeader('Content-Length', buffer.length);
      res.send(buffer);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }
}
