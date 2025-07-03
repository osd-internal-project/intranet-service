import { Controller, Get, Res, Query } from '@nestjs/common';
import { ReportMaService } from './report-ma.service';
import { Response } from 'express';

@Controller('report-ma')
export class ReportMaController {
  constructor(private readonly reportMaService: ReportMaService) {}

  @Get('export')
  async export(
    @Query()
    query: any,
    @Res() res: Response,
  ) {
    try {
      const buffer = await this.reportMaService.export(query);
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
