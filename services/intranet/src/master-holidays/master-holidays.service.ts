import { Injectable } from '@nestjs/common';
import { CreateMasterHolidayDto } from './dto/create-master-holiday.dto';
import { UpdateMasterHolidayDto } from './dto/update-master-holiday.dto';

@Injectable()
export class MasterHolidaysService {
  create(createMasterHolidayDto: CreateMasterHolidayDto) {
    return 'This action adds a new masterHoliday';
  }

  findAll() {
    return `This action returns all masterHolidays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterHoliday`;
  }

  update(updateMasterHolidayDto: UpdateMasterHolidayDto) {
    return `This action updates a #${updateMasterHolidayDto} masterHoliday`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterHoliday`;
  }
}
