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
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';

@Controller('floor')
export class FloorController {
  constructor(private readonly floorService: FloorService) {}

  @Post()
  create(@Body() createFloorDto: CreateFloorDto) {
    return this.floorService.create(createFloorDto);
  }

  @Get()
  findAll() {
    return this.floorService.findAll();
  }

  @Get('query')
  findMany(@Query() query: any) {
    return this.floorService.findMany(query);
  }

  @Get('count')
  findCount(@Query() query: any) {
    return this.floorService.findCount(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.floorService.findOne(+id);
  }

  @Patch(':floorId')
  update(
    @Param('floorId') floorId: string,
    @Body() updateHousekeeperDto: UpdateFloorDto,
  ) {
    return this.floorService.update(+floorId, updateHousekeeperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.floorService.remove(+id);
  }
}
