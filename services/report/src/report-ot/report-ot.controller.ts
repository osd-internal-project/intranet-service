import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { ReportOtService } from './report-ot.service';
@Controller('report-ot')
export class ReportOtController {
  constructor(private readonly reportOtService: ReportOtService) {}

  @Get('export')
  async export(
    @Query()
    query: any,
    @Res() res: Response,
  ) {
    try {
      const buffer = await this.reportOtService.export(query);
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
