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
import { TransactionService } from './transaction.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

import * as dayjs from 'dayjs';
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body('data') data: Prisma.transactionCreateInput) {
    return this.transactionService.create(data);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }
  @Post('count-cost')
  countCost() {
    let startDate = dayjs(new Date()).startOf('month').toDate();
    let endDate = dayjs(new Date()).endOf('month').toDate();
    const condition = {
      where: {
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    };
    return this.transactionService.countCost(condition);
  }

  @Post('export-excel')
  @Header('Content-Type', 'text/xlsx')
  async downloadExcel(
    @Body('query') query: Prisma.transactionFindManyArgs,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const transfer = await this.transactionService.transferExcel(query);

      const buffer = await this.transactionService.createExcelBuffer(transfer);

      // Set response headers
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');
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
    return this.transactionService.findMany(query);
  }

  @Post('condition-expired-date')
  findExpired(@Body('query') query: Prisma.transactionFindManyArgs) {
    return this.transactionService.findMany(query);
  }

  @Post('count-status')
  countstatus(@Body('condition') condition: Prisma.transactionCountArgs) {
    return this.transactionService.countstatus(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.transactionUpdateInput,
  ) {
    return this.transactionService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.transactionService.remove(id);
  }
}
