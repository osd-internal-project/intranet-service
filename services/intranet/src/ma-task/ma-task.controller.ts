import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MaTaskService } from './ma-task.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@inventory/share';
@Controller('ma-task')
export class MaTaskController {
  constructor(private readonly maTaskService: MaTaskService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createMaTaskDto: Prisma.maTaskCreateInput, @Req() req: any) {
    const ownerGroupId = req.user.userMapOwnerGroupId[0].ownerGroupId;
    return this.maTaskService.create(createMaTaskDto, ownerGroupId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.maTaskUpdateInput,
  ) {
    return this.maTaskService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maTaskService.remove(+id);
  }
  @Get('data-table')
  findDataTable(@Query() query, @Req() req: any) {
    const userId = req.user.userId;
    return this.maTaskService.findDataTable(query, userId);
  }
  @Get('range-event')
  findRangeEvent(@Query() query) {
    return this.maTaskService.findRangeEvent(query);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.maTaskService.findOneById(+id);
  }
  @Get()
  findAll() {
    return this.maTaskService.findAll();
  }
}
