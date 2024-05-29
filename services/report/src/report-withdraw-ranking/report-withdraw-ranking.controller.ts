import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Header,
  Res,
} from '@nestjs/common';
import { ReportWithdrawRankingService } from './report-withdraw-ranking.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { dateToStringThDayjs } from '../utils/index';

@Controller('report-withdraw-ranking')
export class ReportWithdrawRankingController {
  constructor(
    private readonly reportWithdrawRankingService: ReportWithdrawRankingService,
  ) {}

  @Get()
  findAll() {
    return this.reportWithdrawRankingService.findAll();
  }

  @Post('export-excel')
  @Header('Content-Type', 'text/xlsx')
  async downloadExcel(
    @Body('query') query: any,
    @Res() res: Response,
  ): Promise<void> {
    try {
      console.log(query);
      const buffer = await this.reportWithdrawRankingService.transferExcel(
        query,
      );

      // Set response headers
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
      res.setHeader('Content-Length', buffer.length);

      // Send the buffer as the response
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  @Post('condition')
  findMany(@Body('query') query: any) {
    return this.reportWithdrawRankingService.findMany(query);
  }
}
