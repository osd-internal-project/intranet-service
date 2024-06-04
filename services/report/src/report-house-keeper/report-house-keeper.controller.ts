import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Header,
  Res,
} from '@nestjs/common';
import { ReportHouseKeeperService } from './report-house-keeper.service';
import { CreateReportHouseKeeperDto } from './dto/create-report-house-keeper.dto';
import { UpdateReportHouseKeeperDto } from './dto/update-report-house-keeper.dto';
import { Response } from 'express';

@Controller('report-house-keeper')
export class ReportHouseKeeperController {
  constructor(
    private readonly reportHouseKeeperService: ReportHouseKeeperService,
  ) {}

  @Post()
  create(@Body() createReportHouseKeeperDto: CreateReportHouseKeeperDto) {
    return this.reportHouseKeeperService.create(createReportHouseKeeperDto);
  }

  @Get()
  findAll() {
    return this.reportHouseKeeperService.findAll();
  }

  @Post('export')
  @Header('Content-Type', 'text/xlsx')
  async findExport(
    @Body('body') body: any,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const buffer = await this.reportHouseKeeperService.findExport(body);
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

  @Get('query')
  findQuery(@Query() query: any) {
    return this.reportHouseKeeperService.findQuery(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportHouseKeeperService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReportHouseKeeperDto: UpdateReportHouseKeeperDto,
  ) {
    return this.reportHouseKeeperService.update(
      +id,
      updateReportHouseKeeperDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportHouseKeeperService.remove(+id);
  }
}
