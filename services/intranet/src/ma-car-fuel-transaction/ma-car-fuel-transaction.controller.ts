import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MaCarFuelTransactionService } from './ma-car-fuel-transaction.service';

@Controller('ma-car-fuel-transaction')
export class MaCarFuelTransactionController {
  constructor(
    private readonly maCarFuelTransactionService: MaCarFuelTransactionService,
  ) {}

  @Post()
  create(@Body() data: Prisma.maCarFuelTransactionCreateInput) {
    return this.maCarFuelTransactionService.create(data);
  }

  @Get()
  findAll() {
    return this.maCarFuelTransactionService.findAll();
  }

  @Get(':carId')
  findMany(@Param('carId') carId: string) {
    return this.maCarFuelTransactionService.findMany(carId);
  }

  @Patch(':carId')
  update(
    @Param('carId') carId: string,
    @Body() data: Prisma.maCarFuelTransactionUpdateInput,
  ) {
    return this.maCarFuelTransactionService.update(carId, data);
  }

  @Delete(':carId')
  remove(@Param('carId') carId: string) {
    return this.maCarFuelTransactionService.remove(carId);
  }
}
