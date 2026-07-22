import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  MaCarFuelTransactionRepository,
  MaCarRepository,
  CarActivityLogService,
  CarActivityAction,
} from '@inventory/share';
import dayjs from 'dayjs';

@Injectable()
export class MaCarCronService {
  private readonly logger = new Logger(MaCarCronService.name);

  constructor(
    private readonly maCarRepository: MaCarRepository,
    private readonly maCarFuelTransactionRepository: MaCarFuelTransactionRepository,
    private readonly activityLog: CarActivityLogService,
  ) {}

  // ==============================
  // ✅ ทุกวัน 00:01 — reset fuel card usage
  // ==============================
  @Cron('1 0 * * *', { timeZone: 'Asia/Bangkok' })
  async resetFuelCardUsage() {
    this.logger.log('Running resetFuelCardUsage...');

    const today = dayjs();
    // const todayDayOfMonth = today.date(); // ใช้วันของเมื่อวานเพื่อให้ตรงกับการรีเซ็ตที่เกิดขึ้นในช่วงเวลา 00:01
    const tomorrowDay = today.add(1, 'day').daysInMonth();
    const nowDay = today.daysInMonth();

    const cars = await this.maCarRepository.findMany({
      where: {
        fuelResetDayOfMonth: {
          not: null,
          ...(tomorrowDay === 1 ? { gte: nowDay } : { equals: nowDay }),
        },
        fuelMonthlyLimit: { not: null },
      },
    });

    for (const car of cars) {
      const fuelMonthlyRemaining = car.fuelMonthlyLimit!;

      await this.maCarRepository.update({
        where: { carId: car.carId },
        data: { fuelMonthlyRemaining, updatedAt: new Date() },
      });

      const txn = await this.maCarFuelTransactionRepository.create({
        data: {
          carId: car.carId,
          amount: 0,
          remaining: fuelMonthlyRemaining,
          actionStatus: 'reset',
        },
      });

      await this.activityLog.log({
        carId: car.carId,
        carName: car.carName,
        action: CarActivityAction.FUEL_RESET,
        refId: txn.id,
        actorName: 'SYSTEM',
        detail: { remaining: fuelMonthlyRemaining },
      });

      this.logger.log(`✅ Reset fuel for carId: ${car.carId}`);
    }
  }
}
