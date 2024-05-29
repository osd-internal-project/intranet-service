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

  setRule() {
    const data = [
      { ruleCode: 'rlue1', ruleName: 'setting-show' },
      { ruleCode: 'rlue2', ruleName: 'user-management-show' },
      { ruleCode: 'rlue3', ruleName: 'user-management-add' },
      { ruleCode: 'rlue4', ruleName: 'user-management-edit' },
      { ruleCode: 'rlue5', ruleName: 'user-management-delete' },
      { ruleCode: 'rlue6', ruleName: 'user-group-show' },
      { ruleCode: 'rlue7', ruleName: 'user-group-add' },
      { ruleCode: 'rlue8', ruleName: 'user-group-edit' },
      { ruleCode: 'rlue9', ruleName: 'user-group-delete' },
      { ruleCode: 'rlue10', ruleName: 'user-role-show' },
      { ruleCode: 'rlue11', ruleName: 'user-role-add' },
      { ruleCode: 'rlue12', ruleName: 'user-role-edit' },
      { ruleCode: 'rlue13', ruleName: 'user-role-delete' },
      { ruleCode: 'rlue14', ruleName: 'user-rule-group-add' },
      { ruleCode: 'rlue15', ruleName: 'user-rule-group-edit' },
      { ruleCode: 'rlue16', ruleName: 'user-rule-group-delete' },
      { ruleCode: 'rlue17', ruleName: 'user-rule-show' },
      { ruleCode: 'rlue18', ruleName: 'user-position-show' },
      { ruleCode: 'rlue19', ruleName: 'user-position-add' },
      { ruleCode: 'rlue20', ruleName: 'user-position-edit' },
      { ruleCode: 'rlue21', ruleName: 'user-position-delete' },
      { ruleCode: 'rlue22', ruleName: 'department-show' },
      { ruleCode: 'rlue23', ruleName: 'department-add' },
      { ruleCode: 'rlue24', ruleName: 'department-edit' },
      { ruleCode: 'rlue25', ruleName: 'department-delete' },
      { ruleCode: 'rlue26', ruleName: 'inventory-show' },
      { ruleCode: 'rlue27', ruleName: 'inventory-add' },
      { ruleCode: 'rlue28', ruleName: 'inventory-edit' },
      { ruleCode: 'rlue29', ruleName: 'inventory-delete' },
      { ruleCode: 'rlue30', ruleName: 'vender-show' },
      { ruleCode: 'rlue31', ruleName: 'vender-add' },
      { ruleCode: 'rlue32', ruleName: 'vender-edit' },
      { ruleCode: 'rlue33', ruleName: 'vender-delete' },
      { ruleCode: 'rlue34', ruleName: 'objective-show' },
      { ruleCode: 'rlue35', ruleName: 'objective-add' },
      { ruleCode: 'rlue36', ruleName: 'objective-edit' },
      { ruleCode: 'rlue37', ruleName: 'objective-delete' },
      { ruleCode: 'rlue38', ruleName: 'mp-ghs-show' },
      { ruleCode: 'rlue39', ruleName: 'mp-ghs-add' },
      { ruleCode: 'rlue40', ruleName: 'mp-ghs-edit' },
      { ruleCode: 'rlue41', ruleName: 'mp-ghs-delete' },
      { ruleCode: 'rlue42', ruleName: 'mp-unit-show' },
      { ruleCode: 'rlue43', ruleName: 'mp-unit-add' },
      { ruleCode: 'rlue44', ruleName: 'mp-unit-edit' },
      { ruleCode: 'rlue45', ruleName: 'mp-unit-delete' },
      { ruleCode: 'rlue46', ruleName: 'brand-show' },
      { ruleCode: 'rlue47', ruleName: 'brand-add' },
      { ruleCode: 'rlue48', ruleName: 'brand-edit' },
      { ruleCode: 'rlue49', ruleName: 'brand-delete' },
      { ruleCode: 'rlue50', ruleName: 'mp-category-show' },
      { ruleCode: 'rlue51', ruleName: 'mp-category-add' },
      { ruleCode: 'rlue52', ruleName: 'mp-category-edit' },
      { ruleCode: 'rlue53', ruleName: 'mp-category-delete' },
      { ruleCode: 'rlue54', ruleName: 'mp-group-add' },
      { ruleCode: 'rlue55', ruleName: 'mp-group-edit' },
      { ruleCode: 'rlue56', ruleName: 'mp-group-delete' },
      { ruleCode: 'rlue57', ruleName: 'mp-type-add' },
      { ruleCode: 'rlue58', ruleName: 'mp-type-edit' },
      { ruleCode: 'rlue59', ruleName: 'mp-type-delete' },
      { ruleCode: 'rlue60', ruleName: 'm-product-show' },
      { ruleCode: 'rlue61', ruleName: 'm-product-add' },
      { ruleCode: 'rlue62', ruleName: 'm-product-edit' },
      { ruleCode: 'rlue63', ruleName: 'm-product-delete' },
      { ruleCode: 'rlue64', ruleName: 'order-show' },
      { ruleCode: 'rlue65', ruleName: 'order-add' },
      { ruleCode: 'rlue66', ruleName: 'order-success' },
      { ruleCode: 'rlue67', ruleName: 'order-cancel' },
      { ruleCode: 'rlue68', ruleName: 'order-edit' },
      { ruleCode: 'rlue69', ruleName: 'order-delete' },
      { ruleCode: 'rlue70', ruleName: 'product-list-show' },
      { ruleCode: 'rlue71', ruleName: 'inventory-stock-show' },
      { ruleCode: 'rlue72', ruleName: 'inventory-stock-add' },
      { ruleCode: 'rlue73', ruleName: 'report-withdraw-ranking-show' },
      { ruleCode: 'rlue74', ruleName: 'report-transaction-show' },
      { ruleCode: 'rlue75', ruleName: 'report-expired' },
      { ruleCode: 'rlue76', ruleName: 'mp-hazard-type-show' },
    ] as unknown as Prisma.masterRuleCreateManyInput;
    return this.masterRuleRepo.createMany({ data: data });
  }
}
