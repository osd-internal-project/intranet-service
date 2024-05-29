import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Prisma } from '@prisma/client';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('department')
  findMostDepartment() {
    return this.dashboardService.findMostDepartment();
  }
  @Get('count-per-month')
  findCountPerMonth() {
    return this.dashboardService.findCountPerMonth();
  }
  @Get('amount-per-month')
  findAmountPerMonth() {
    return this.dashboardService.findAmountPerMonth();
  }
  @Get('most-orders')
  findMostOrders() {
    return this.dashboardService.findMostOrders();
  }
}
