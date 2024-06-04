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
import { ResultCleanlinesService } from './result-cleanlines.service';
import { CreateResultCleanlineDto } from './dto/create-result-cleanline.dto';
import { UpdateResultCleanlineDto } from './dto/update-result-cleanline.dto';

@Controller('result-cleanlines')
export class ResultCleanlinesController {
  constructor(
    private readonly resultCleanlinesService: ResultCleanlinesService,
  ) {}

  @Post()
  create(@Body() createResultCleanlineDto: CreateResultCleanlineDto) {
    return this.resultCleanlinesService.create(createResultCleanlineDto);
  }

  @Get()
  findAll() {
    return this.resultCleanlinesService.findAll();
  }

  @Get('query')
  findMany(@Query() query: any) {
    return this.resultCleanlinesService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultCleanlinesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResultCleanlineDto: UpdateResultCleanlineDto,
  ) {
    return this.resultCleanlinesService.update(+id, updateResultCleanlineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultCleanlinesService.remove(+id);
  }
}
