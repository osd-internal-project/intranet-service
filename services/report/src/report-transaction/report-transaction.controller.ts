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
import { ReportTransactionService } from './report-transaction.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { dateToStringThDayjs } from '../utils/index';

@Controller('report-transaction')
export class ReportTransactionController {
  constructor(
    private readonly reportTransactionService: ReportTransactionService,
  ) {}

  @Get()
  findAll() {
    return this.reportTransactionService.findAll();
  }

  @Post('export-excel')
  @Header('Content-Type', 'text/xlsx')
  async downloadExcel(
    @Body('condition') condition: Prisma.transactionWhereInput,
    @Body('status') status: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const buffer = await this.reportTransactionService.transferExcel(
        condition,
        status,
      );

      // Set response headers
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=report-transaction-' +
          dateToStringThDayjs(new Date()) +
          '.xlsx',
      );
      res.setHeader('Content-Length', buffer.length);

      // Send the buffer as the response
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  @Post('condition')
  findMany(@Body('query') query: Prisma.transactionFindManyArgs) {
    return this.reportTransactionService.findMany(query);
  }
  @Post('getdatatable')
  datatTa(@Body('query') query: Prisma.transactionFindManyArgs) {
    return this.reportTransactionService.findMany(query);
  }

  @Post('count')
  count(@Body('query') query: Prisma.transactionCountArgs) {
    return this.reportTransactionService.count(query);
  }

  @Post('condition-expired-date')
  findExpired(@Body('query') query: Prisma.transactionFindManyArgs) {
    return this.reportTransactionService.findMany(query);
  }
}
