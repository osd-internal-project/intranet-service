import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MasterHolidaysYearService } from './master-holidays-year.service';
import { CreateMasterHolidaysYearDto } from './dto/create-master-holidays-year.dto';
import { UpdateMasterHolidaysYearDto } from './dto/update-master-holidays-year.dto';

@Controller('master-holidays-year')
export class MasterHolidaysYearController {
  constructor(
    private readonly masterHolidaysYearService: MasterHolidaysYearService,
  ) {}

  @Post()
  create(@Body() createMasterHolidaysYearDto: CreateMasterHolidaysYearDto) {
    return this.masterHolidaysYearService.create({
      holidaysYear: createMasterHolidaysYearDto.holidaysYear,
    });
  }

  @Post('validate-name')
  validateName(
    @Body() createMasterHolidaysYearDto: CreateMasterHolidaysYearDto,
  ) {
    return this.masterHolidaysYearService.validateName({
      holidaysYear: createMasterHolidaysYearDto.holidaysYear,
    });
  }

  @Get()
  findAll() {
    return this.masterHolidaysYearService.findAll();
  }

  @Get(':year')
  findOne(@Param('year') year: string) {
    return this.masterHolidaysYearService.findOne(year);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterHolidaysYearDto: UpdateMasterHolidaysYearDto,
  ) {
    return this.masterHolidaysYearService.update(
      +id,
      updateMasterHolidaysYearDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterHolidaysYearService.remove(+id);
  }
}
