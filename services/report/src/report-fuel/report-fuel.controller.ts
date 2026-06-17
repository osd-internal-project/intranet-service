import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportFuelService } from './report-fuel.service';
import {
  ReportFuelChartQueryDto,
  ReportFuelQueryDto,
} from './dto/report-fuel-query.dto';

@Controller('report-fuel')
export class ReportFuelController {
  constructor(private readonly reportFuelService: ReportFuelService) {}

  /** Car dropdown options for the report filter. */
  @Get('cars')
  getCars() {
    return this.reportFuelService.getCarOptions();
  }

  /** Monthly fuel-usage bar chart (last 6 months, `use` only). */
  @Get('chart')
  chart(@Query() query: ReportFuelChartQueryDto) {
    return this.reportFuelService.chart(query);
  }

  /** Export the filtered fuel transactions as an Excel file. */
  @Get('export')
  async export(@Query() query: ReportFuelQueryDto, @Res() res: Response) {
    try {
      const buffer = await this.reportFuelService.export(query);
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

  /** Paginated, filterable fuel-transaction table. */
  @Get()
  findTable(@Query() query: ReportFuelQueryDto) {
    return this.reportFuelService.findTable(query);
  }
}
