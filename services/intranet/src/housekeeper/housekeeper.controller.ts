import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HousekeeperService } from './housekeeper.service';
import { CreateHousekeeperDto } from './dto/create-housekeeper.dto';
import { UpdateHousekeeperDto } from './dto/update-housekeeper.dto';

@Controller('housekeeper')
export class HousekeeperController {
  constructor(private readonly housekeeperService: HousekeeperService) {}

  @Post()
  create(@Body() createHousekeeperDto: CreateHousekeeperDto) {
    return this.housekeeperService.create(createHousekeeperDto);
  }

  @Get()
  findAll() {
    return this.housekeeperService.findAll();
  }

  @Get('query')
  findMany(@Query() query: any) {
    return this.housekeeperService.findMany(query);
  }

  @Get('count')
  findCount(@Query() query: any) {
    return this.housekeeperService.findCount(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housekeeperService.findOne(+id);
  }

  @Patch(':houseKeeperId')
  update(
    @Param('houseKeeperId') houseKeeperId: string,
    @Body() updateHousekeeperDto: UpdateHousekeeperDto,
  ) {
    return this.housekeeperService.update(+houseKeeperId, updateHousekeeperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.housekeeperService.remove(+id);
  }
}
