import { Injectable } from '@nestjs/common';
import { ContactRepository, VenderRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class VenderService {
  constructor(
    private venderRepo: VenderRepository,
    private contactRepo: ContactRepository,
  ) {}
  create(data: Prisma.venderCreateInput) {
    const condition = { data: data } as Prisma.venderCreateArgs;
    return this.venderRepo.create(condition);
  }

  createContact(data: Prisma.contactCreateManyInput[]) {
    return this.contactRepo.createContact({ data: data });
  }

  findAll() {
    const condition = {
      include: {
        contact: true,
      },
      orderBy: { id: 'desc' },
    } as Prisma.venderFindManyArgs;
    return this.venderRepo.findAll(condition);
  }
  count() {
    const condition = {} as Prisma.venderCountArgs;

    return this.venderRepo.count(condition);
  }
  findByCondition(condition: Prisma.venderFindManyArgs) {
    const Condition = {
      ...condition,
      include: {
        contact: true,
      },
      orderBy: { id: 'asc' },
    } as Prisma.venderFindManyArgs;
    return this.venderRepo.findByCondition(Condition);
  }
  findByOneCondition(condition: Prisma.venderFindManyArgs) {
    const Condition = {
      ...condition,
      include: {
        contact: true,
      },
    };
    return this.venderRepo.findOneByCondition(Condition);
  }

  async update(id: string, data: Prisma.venderUpdateInput, contact: any[]) {
    const condition = {
      where: { venderID: id },
      data: data,
    } as Prisma.venderUpdateArgs;
    const update_vender = await this.venderRepo.update(condition);
    if (update_vender && contact !== undefined) {
      const deleteContact = await this.contactRepo.deleteMany({
        where: { venderID: id },
      });
      if (deleteContact) {
        const contactsSet = contact.map((value: any) => ({
          contact_name: value.contact_name,
          phoneNumber: value.phoneNumber,
          fax_number: value.fax_number,
          email: value.email,
          description: value.description,
          venderID: id,
        }));

        const update_contact = await this.contactRepo.createContact({
          data: contactsSet,
        });
        return update_contact;
      }
      return deleteContact;
    }
    return update_vender;
  }

  async updateContact(id: string, data: Prisma.contactUpdateArgs) {
    const condition = {
      where: { venderID: id },
      data,
    } as Prisma.contactUpdateArgs;

    return await this.contactRepo.update(condition);
  }
  async remove(id: string) {
    const venderCondition = {
      where: { venderID: id },
    } as Prisma.venderDeleteArgs;
    const contactCondition = {
      where: { venderID: id },
    } as Prisma.contactDeleteManyArgs;
    const delVender = await this.venderRepo.delete(venderCondition);
    if (delVender) {
      const deleteContact = await this.contactRepo.deleteMany(contactCondition);
      return deleteContact;
    }
    return delVender;
  }
}
