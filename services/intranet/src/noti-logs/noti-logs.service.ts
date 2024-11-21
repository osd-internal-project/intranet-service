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
  async findByUser(
    userId: string,
    query: { notiStatus?: string; action?: string },
  ) {
    const { notiStatus, action } = query;
    const acessLeaveUsers =
      await this.accessService.getLeaveAccessedUsersByHeaderUserId(userId);

    return await this.notificationlogsRepo.count({
      where: {
        sendUserId: { in: acessLeaveUsers },
        ...(notiStatus && { notiStatus: notiStatus }),
        ...(action && { action: action }),
      },
    });
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
