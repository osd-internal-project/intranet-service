import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { MasterRuleService } from './master-rule.service';
import { Prisma } from '@prisma/client';
@Controller('master-rule')
export class MasterRuleController {
  constructor(private readonly masterRuleService: MasterRuleService) {}

  @Post()
  create(@Body('data') data: Prisma.masterRuleCreateInput) {
    return this.masterRuleService.create(data);
  }

  @Get()
  findAll() {
    return this.masterRuleService.findAll();
  }

  @Post('condition')
  findByCondition(@Body('condition') condition: Prisma.masterRuleFindManyArgs) {
    return this.masterRuleService.findByCondition(condition);
  }

  @Patch()
  update(
    @Body('ruleCode') ruleCode: string,
    @Body('data') data: Prisma.masterRuleUpdateInput,
  ) {
    return this.masterRuleService.update(ruleCode, data);
  }
  @Delete(':rule')
  async remove(@Param('rule') rule: string) {
    return this.masterRuleService.remove(rule);
  }

  @Post('set-rules')
  setRule() {
    return this.masterRuleService.setRule();
  }
}
