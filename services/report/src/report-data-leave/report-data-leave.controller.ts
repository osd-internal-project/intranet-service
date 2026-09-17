import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles, RolesGuard, UserInterceptor } from '@inventory/share';
import { ReportDataLeaveService } from './report-data-leave.service';
import { Response } from 'express';

@Controller('report-data-leave')
export class ReportDataLeaveController {
  constructor(
    private readonly reportDataLeaveService: ReportDataLeaveService,
  ) {}

  @Get('export')
  @UseGuards(RolesGuard)
  @Roles('admin', 'header', 'hr')
  @UseInterceptors(UserInterceptor)
  async export(
    @Req() req,
    @Query()
    query: { type: string; value: string },
    @Res() res: Response,
  ) {
    try {
      const buffer = await this.reportDataLeaveService.export(
        query,
        req.body.sub,
        req.roleCodes ?? [],
      );
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
