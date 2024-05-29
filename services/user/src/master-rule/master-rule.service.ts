import { Injectable } from '@nestjs/common';
import { MasterRuleRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterRuleService {
  constructor(private masterRuleRepo: MasterRuleRepository) {}

  create(data: Prisma.masterRuleCreateInput) {
    const condition = { data: data } as Prisma.masterRuleCreateArgs;
    return this.masterRuleRepo.create(condition);
  }

  findAll() {
    return this.masterRuleRepo.findAll();
  }

  findByCondition(condition: Prisma.masterRuleFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.masterRuleRepo.findByCondition(condition);
  }

  async update(ruleCode: string, data: Prisma.masterRuleUpdateInput) {
    const condition = {
      where: { ruleCode: ruleCode },
      data: { ...data, updatedAt: new Date() },
    } as Prisma.masterRuleUpdateArgs;
    return await this.masterRuleRepo.update(condition);
  }

  async remove(ruleCode: string) {
    const condition = {
      where: { ruleCode: ruleCode },
    } as Prisma.masterRuleDeleteArgs;
    return await this.masterRuleRepo.delete(condition);
  }
}
