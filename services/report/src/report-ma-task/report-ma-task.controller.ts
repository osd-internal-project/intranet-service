import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
  Header,
  Res,
} from '@nestjs/common';
import { ReportMaTaskService } from './report-ma-task.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
@Controller('report-ma-task')
export class ReportMaTaskController {
  constructor(private readonly reportMaTaskService: ReportMaTaskService) {}

  @Post('export')
  @Header('Content-Type', 'text/xlsx')
  async findExport(
    @Body('body') body: any,
    @Res() res: Response,
  ): Promise<void> {
    try {
      console.log(body);
      const buffer = await this.reportMaTaskService.findExport(body);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
      res.setHeader('Content-Length', buffer.length);
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
