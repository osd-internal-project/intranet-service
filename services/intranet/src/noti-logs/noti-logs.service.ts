import { Injectable } from '@nestjs/common';
import { AccessService, NotificationLogsRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotiLogsService {
  constructor(
    private readonly notificationlogsRepo: NotificationLogsRepository,
    private readonly accessService: AccessService,
  ) {}
  async create(data: Prisma.notiActionLogsCreateInput) {
    const base: Prisma.notiActionLogsCreateArgs = {
      data,
    };
    return await this.notificationlogsRepo.create(base);
  }

  async findAll() {
    return await this.notificationlogsRepo.findAll();
  }
  async findByUser(userId: string) {
    // const { notiStatus, action, type } = query;
    const ownergroup = await this.accessService.getOwnerGroupByUserId(userId);
    const data = [];
    const leaves = await this.notificationlogsRepo.count({
      where: {
        toGroupIds: ownergroup.groupId,
        notiStatus: 'no-action',
        type: 'leave',
        action: 'waitting',
      },
    });
    if (leaves > 0) {
      data.push({
        type: 'leaves',
        action: 'waitting',
        title: 'วันลารอ Approve',
        count: leaves,
        path: '/page/leave-control-management/leave-letter',
      });
    }
    const expenses = await this.notificationlogsRepo.count({
      where: {
        toGroupIds: ownergroup.groupId,
        notiStatus: 'no-action',
        type: 'expense',
        action: 'waitting',
      },
    });
    if (expenses > 0) {
      data.push({
        type: 'expense',
        action: 'waitting',
        title: 'การเบอก Approve',
        count: expenses,
        path: '/page/expense',
      });
    }
    return data;
  }

  async findOne(id: number) {
    return await this.notificationlogsRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateData: Prisma.notiActionLogsUpdateInput) {
    const base: Prisma.notiActionLogsUpdateArgs = {
      where: {
        id: id,
      },
      data: { ...updateData },
    };
    return await this.notificationlogsRepo.update(base);
  }

  async remove(id: number) {
    const base: Prisma.notiActionLogsDeleteArgs = {
      where: {
        id: id,
      },
    };
    return await this.notificationlogsRepo.delete(base);
  }
}
