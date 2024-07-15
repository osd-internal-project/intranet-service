import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  CustomerDetailRepository,
  CustomerFilesRepository,
  CustomerTypeRepository,
  CustomerResponsibleRepository,
  CustomerGroupRepository,
  CustomerChannelTypeRepository,
  CustomerJobTypeRepository,
  CustomerWorkTypeRepository,
  CustomerPriorityRepository,
  CustomerRequestTypeRepository,
  UserMapOrganizeGroupOwnerRepository,
  AccessService,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
@Injectable()
export class CustomerDetailService {
  constructor(
    private readonly customerDetailRepo: CustomerDetailRepository,
    private readonly customerFilesReposito: CustomerFilesRepository,
    private readonly customerGroupRepo: CustomerGroupRepository,
    private readonly customerResponsibleRepo: CustomerResponsibleRepository,
    private readonly customerTypeRepo: CustomerTypeRepository,
    private readonly customerChannelTypeRepo: CustomerChannelTypeRepository,
    private readonly customerJobTypeRepo: CustomerJobTypeRepository,
    private readonly customerWorkTypeRepo: CustomerWorkTypeRepository,
    private readonly customerRequestTypeRepo: CustomerRequestTypeRepository,
    private readonly customerPriorityRepo: CustomerPriorityRepository,
    //User
    private readonly userMapOrganizeGroupOwnerRepo: UserMapOrganizeGroupOwnerRepository,
    private readonly accessService: AccessService,
  ) {}
  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }
  async create(data: Prisma.customerDetailCreateInput) {
    const responsible = data.responsible as any;
    let responsibleGroup = [];
    if (responsible) {
      const userids = responsible.map(
        (data: { uid: string; name: string }) => data.uid,
      );
      if (userids && userids.length > 0) {
        const group = await this.userMapOrganizeGroupOwnerRepo.findMany({
          where: { usersId: { in: userids } },
        });

        responsibleGroup = group.map((data) => data.ownerGroupId);
      }
    }
    const condition = {
      data: { ...data, responsibleGroup: responsibleGroup },
    } as Prisma.customerDetailCreateArgs;

    return this.customerDetailRepo.create(condition);
  }

  findAll() {
    return this.customerDetailRepo.findAll();
  }

  findOne(condition: Prisma.customerDetailFindFirstArgs) {
    return this.customerDetailRepo.findOne(condition);
  }
  async findOneById(id: number) {
    const customers = await this.customerDetailRepo.findOne({
      where: { id: id },
    });

    return customers;
  }

  findMany(query: any) {
    const { refcode, customername, activestatus } = query;

    return this.customerDetailRepo.findMany({
      where: {
        ...(refcode && { referenceCode: { contains: refcode } }),
        ...(activestatus && { activeStatus: JSON.parse(activestatus) }),
        ...(customername && {
          OR: [
            { prefixTh: { contains: customername } },
            { firstNameTh: { contains: customername } },
            { lastNameTh: { contains: customername } },
          ],
        }),
      },
    });
  }

  async findDatatable(query: any) {
    const { refcode, customername, activestatus, take, skip, userid } = query;
    const ownerGroups = await this.accessService.getOwnerGroupId(userid);
    const ownerUserGroup = await this.accessService.getOwnerGroupByUserId(
      userid,
    );
    const data = await this.customerDetailRepo.findMany({
      where: {
        ...(refcode && { referenceCode: { contains: refcode } }),
        ...(activestatus && { activeStatus: JSON.parse(activestatus) }),
        ...(customername && {
          OR: [
            { prefixTh: { contains: customername } },
            { firstNameTh: { contains: customername } },
            { lastNameTh: { contains: customername } },
          ],
        }),
        ...(!ownerUserGroup.exceptionalSatatus && {
          OR: [
            { responsible: { hasSome: { path: ['uid'], equals: userid } } },
            { responsibleGroup: { hasSome: ownerGroups } },
          ],
        }),
      },
      ...(take && { take: Number(take) }),
      ...(skip && { skip: Number(skip) }),
    });
    const count = await this.customerDetailRepo.count({
      where: {
        ...(refcode && { referenceCode: { contains: refcode } }),
        ...(activestatus && { activeStatus: JSON.parse(activestatus) }),
        ...(customername && {
          OR: [
            { prefixTh: { contains: customername } },
            { firstNameTh: { contains: customername } },
            { lastNameTh: { contains: customername } },
          ],
          ...(!ownerUserGroup.exceptionalSatatus && {
            responsibleGroup: { hasSome: ownerGroups },
          }),
        }),
      },
    });
    return { data: data, count: count };
  }

  findActiveForProject() {
    return this.customerDetailRepo.findMany({
      where: { activeStatus: true },
      // select: {
      //   id: true,
      //   prefixTh: true,
      //   firstNameTh: true,
      //   lastNameTh: true,
      //   customerBranch: {
      //     select: {
      //       id: true,
      //       branchName: true,
      //       customerAddress: true,
      //       customerContact: true,
      //     },
      //   },
      // },
    });
  }
  findConfigCustomerGroup() {
    return this.customerGroupRepo.findMany({
      where: { activeStatus: true },
    });
  }
  findConfigCustomerType() {
    return this.customerTypeRepo.findMany({
      where: { activeStatus: true },
    });
  }

  findConfigCustomerResponsible() {
    return this.customerResponsibleRepo.findMany({
      where: { activeStatus: true },
    });
  }

  async findConfigForTicket() {
    const channelTypeList = await this.customerChannelTypeRepo.findMany({
      where: { activeStatus: true },
    });
    const jobTypeList = await this.customerJobTypeRepo.findMany({
      where: { activeStatus: true },
    });
    const priorityList = await this.customerPriorityRepo.findMany({
      where: { activeStatus: true },
    });
    const workTypeList = await this.customerWorkTypeRepo.findMany({
      where: { activeStatus: true },
    });
    const requestTypeList = await this.customerRequestTypeRepo.findMany({
      where: { activeStatus: true },
    });
    return {
      channelTypeList: channelTypeList ? channelTypeList : [],
      jobTypeList: jobTypeList ? jobTypeList : [],
      priorityList: priorityList ? priorityList : [],
      workTypeList: workTypeList ? workTypeList : [],
      requestTypeList: requestTypeList ? requestTypeList : [],
    };
  }

  async update(id: number, data: Prisma.customerDetailUpdateInput) {
    const responsible = data.responsible as any;
    let responsibleGroup = [];
    if (responsible) {
      const userids = responsible.map(
        (data: { uid: string; name: string }) => data.uid,
      );
      if (userids && userids.length > 0) {
        const group = await this.userMapOrganizeGroupOwnerRepo.findMany({
          where: { usersId: { in: userids } },
        });

        responsibleGroup = group.map((data) => data.ownerGroupId);
      }
    }

    return this.customerDetailRepo.update({
      where: { id: id },
      data: {
        ...data,
        updatedAt: new Date(),
        responsibleGroup: responsibleGroup,
      },
    });
  }

  async remove(id: number) {
    const customer = (await this.customerDetailRepo.findOne({
      where: { id: id },
      select: { customerBranch: { select: { customerProject: true } } },
    })) as any;
    Logger.debug(customer);
    customer.customerBranch.map((data) => {
      if (data.customerProject.length > 0) {
        throw new BadRequestException('Project Used');
      }
    });
    // return this.customerDetailRepo.delete({ where: { id: id } });
  }
}
