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
import { OrganizeChartService } from './organize-chart.service';
import { CreateOrganizeChartDto } from './dto/create-organize-chart.dto';
import { UpdateOrganizeChartDto } from './dto/update-organize-chart.dto';

@Controller('organize-chart')
export class OrganizeChartController {
  constructor(private readonly organizeChartService: OrganizeChartService) {}

  @Post()
  create(@Body() createOrganizeChartDto: CreateOrganizeChartDto) {
    return this.organizeChartService.create(createOrganizeChartDto);
  }

  @Get()
  findAll() {
    return this.organizeChartService.findAll();
  }

  @Get('findChildrenById/:rootId')
  findChildrenById(@Param('rootId') rootId: any) {
    return this.organizeChartService.findChildrenById(rootId);
  }

  @Get('query')
  findByQuery(@Query() query: any) {
    return this.organizeChartService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizeChartService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizeChartDto: UpdateOrganizeChartDto,
  ) {
    return this.organizeChartService.update(id, updateOrganizeChartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizeChartService.remove(id);
  }
}
