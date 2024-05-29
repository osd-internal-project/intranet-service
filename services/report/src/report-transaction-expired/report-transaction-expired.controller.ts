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
import { ReportTransactionExpiredService } from './report-transaction-expired.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { dateToStringThDayjs } from '../utils/index';

@Controller('report-transaction-expired')
export class ReportTransactionExpiredController {
  constructor(
    private readonly reportTransactionexpiredService: ReportTransactionExpiredService,
  ) {}

  @Get()
  findAll() {
    return this.reportTransactionexpiredService.findAll();
  }

  @Post('export-excel')
  @Header('Content-Type', 'text/xlsx')
  async downloadExcel(
    @Body('query') query: Prisma.transactionFindManyArgs,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const buffer = await this.reportTransactionexpiredService.transferExcel(
        query,
      );
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

  @Post('count')
  count(@Body('query') query: Prisma.inventoryLotCountArgs) {
    return this.reportTransactionexpiredService.count(query);
  }

  @Post('condition-expired-date')
  findExpired(
    @Body('query') query: object,
    @Body('pagination')
    pagination: {
      current: number;
      pageSize: number;
    },
  ) {
    return this.reportTransactionexpiredService.findMany(query, pagination);
  }
}
