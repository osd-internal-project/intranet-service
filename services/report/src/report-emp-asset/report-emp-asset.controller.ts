import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { ReportEmpAssetService } from './report-emp-asset.service';
import { Response } from 'express';

@Controller('report-emp-asset')
export class ReportEmpAssetController {
  constructor(private readonly reportEmpAssetService: ReportEmpAssetService) {}
  @Get('export-all')
  async exportAll(
    @Query() query: any,
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const buffer = await this.reportEmpAssetService.exportAll(query);
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
  @Get('export/:userId')
  async export(
    @Query() query: any,
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const buffer = await this.reportEmpAssetService.export(userId, query);
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
  @Get('export-teams/:userId')
  async exportTeams(
    @Query() query: any,
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const buffer = await this.reportEmpAssetService.exportTeams(
        userId,
        query,
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
