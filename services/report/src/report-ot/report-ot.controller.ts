import {
  Controller,
  Get,
  Res,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles, RolesGuard, UserInterceptor } from '@inventory/share';
import { ReportOtService } from './report-ot.service';
@Controller('report-ot')
export class ReportOtController {
  constructor(private readonly reportOtService: ReportOtService) {}

  @Get('export')
  @UseGuards(RolesGuard)
  @Roles('admin', 'header', 'hr')
  @UseInterceptors(UserInterceptor)
  async export(
    @Req() req,
    @Query()
    query: any,
    @Res() res: Response,
  ) {
    try {
      const buffer = await this.reportOtService.export(
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
