import { Injectable } from '@nestjs/common';
import { ContactRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(private contactRepo: ContactRepository) {}

  findByCondition(venderId: string) {
    const condition = {
      where: {
        venderID: venderId,
      },
    };
    return this.contactRepo.findByCondition(condition);
  }

  async removeContact(id: string) {
    const condition = {
      where: { venderID: id },
    } as Prisma.contactDeleteManyArgs;
    return await this.contactRepo.deleteMany(condition);
  }
}
