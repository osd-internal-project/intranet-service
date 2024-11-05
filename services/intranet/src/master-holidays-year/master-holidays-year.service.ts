import { Injectable } from '@nestjs/common';
import { CreateMasterHolidaysYearDto } from './dto/create-master-holidays-year.dto';
import { UpdateMasterHolidaysYearDto } from './dto/update-master-holidays-year.dto';
import { MasterHolidaysYearRepository } from '@inventory/share';

@Injectable()
export class MasterHolidaysYearService {
  constructor(
    private readonly masterHolidaysYearRepo: MasterHolidaysYearRepository,
  ) {}
  create(createMasterHolidaysYearDto: CreateMasterHolidaysYearDto) {
    return this.masterHolidaysYearRepo.create({
      data: createMasterHolidaysYearDto,
    });
  }

  async validateName(createMasterHolidaysYearDto: CreateMasterHolidaysYearDto) {
    const count = await this.masterHolidaysYearRepo.count({
      where: { holidaysYear: createMasterHolidaysYearDto.holidaysYear },
    });
    if (count) {
      return {
        statusCode: 200,
        message: 'This year already exists.',
        error: 'Bad Request',
      };
    }
  }

  findAll() {
    return this.masterHolidaysYearRepo.findAll();
  }

  findOne(year: string) {
    return this.masterHolidaysYearRepo.findOne({
      where: { holidaysYear: year },
    });
  }

  update(id: number, updateMasterHolidaysYearDto: UpdateMasterHolidaysYearDto) {
    return `This action updates a #${id} masterHolidaysYear`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterHolidaysYear`;
  }
}
