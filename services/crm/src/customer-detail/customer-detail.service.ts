import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  CustomerDetailRepository,
  CustomerFilesRepository,
  CustomerTypeRepository,
  CustomerResponsibleRepository,
  CustomerTypeGroupRepository,
  CustomerChannelTypeRepository,
  CustomerJobTypeRepository,
  CustomerWorkTypeRepository,
  CustomerPriorityRepository,
  CustomerRequestTypeRepository,
  UserMapOrganizeGroupOwnerRepository,
  AccessService,
  ExpenseTypeRepository,
  ContractCompanyRepository,
  CustomerProjectRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
@Injectable()
export class CustomerDetailService {
  constructor(
    private readonly contractCompanyRepo: ContractCompanyRepository,
    private readonly customerDetailRepo: CustomerDetailRepository,
    private readonly customerFilesReposito: CustomerFilesRepository,
    private readonly customerTypeGroupRepo: CustomerTypeGroupRepository,
    private readonly customerResponsibleRepo: CustomerResponsibleRepository,
    private readonly customerTypeRepo: CustomerTypeRepository,
    private readonly customerChannelTypeRepo: CustomerChannelTypeRepository,
    private readonly customerJobTypeRepo: CustomerJobTypeRepository,
    private readonly customerWorkTypeRepo: CustomerWorkTypeRepository,
    private readonly customerRequestTypeRepo: CustomerRequestTypeRepository,
    private readonly customerPriorityRepo: CustomerPriorityRepository,
    private readonly expenseTypeRepo: ExpenseTypeRepository,
    private readonly customerProjectRepo: CustomerProjectRepository,
    //User
    private readonly userMapOrganizeGroupOwnerRepo: UserMapOrganizeGroupOwnerRepository,
    private readonly accessService: AccessService,
  ) {}

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
        deleteStatus: false,
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

  async findDatatable(search: any) {
    const { customerName, referenceCode, branchName, productName, userid } =
      search || {};
    // const { take, skip, userid } = query;
    Logger.debug(search);
    const ownerGroups = await this.accessService.getOwnerGroupId(userid);
    const ownerUserGroup = await this.accessService.getOwnerGroupByUserId(
      userid,
    );
    const whereAnd = [];
    if (customerName) {
      whereAnd.push({
        OR: [
          {
            customerNameTh: { contains: customerName },
          },
          {
            customerNameEn: { contains: customerName },
          },
        ],
      });
    }
    if (branchName) {
      whereAnd.push({
        customerBranch: {
          some: { branchName: { contains: branchName } },
        },
      });
    }
    if (productName) {
      whereAnd.push({
        customerBranch: {
          some: {
            customerProject: {
              some: {
                customerProjectProductMap: {
                  some: {
                    customerProduct: { name: { contains: productName } },
                  },
                },
              },
            },
          },
        },
      });
    }
    if (referenceCode) {
      referenceCode: {
        contains: referenceCode;
      }
    }
    // if (!ownerUserGroup.exceptionalSatatus) {
    //   whereAnd.push({
    //     OR: [
    //       { responsibleId: { hasSome: userid } },
    //       { responsibleGroup: { hasSome: ownerGroups } },
    //     ],
    //   });
    // }

    const findCondition = {
      where: {
        ...(whereAnd.length > 0 && { AND: whereAnd }),

        deleteStatus: false,
      },
    } as Prisma.customerDetailFindManyArgs;

    const countCondition = {
      where: {
        ...(whereAnd.length > 0 && { AND: whereAnd }),
        deleteStatus: false,
      },
    } as Prisma.customerDetailCountArgs;
    const data = await this.customerDetailRepo.findMany(findCondition);
    const count = await this.customerDetailRepo.count(countCondition);

    return { data: data, count: count };
  }
  findActiveForProject() {
    return this.customerDetailRepo.findMany({
      where: { deleteStatus: false, activeStatus: true },
      orderBy: { createdAt: 'asc' },
    });
  }
  async findDatatableBak(query: any) {
    const {
      refcode,
      customerGroupId,
      customername,
      activestatus,
      take,
      skip,
      userid,
    } = query;

    const ownerGroups = await this.accessService.getOwnerGroupId(userid);
    const ownerUserGroup = await this.accessService.getOwnerGroupByUserId(
      userid,
    );
    const whereAnd = [];
    if (customername) {
      whereAnd.push({
        OR: [
          { details: { path: ['details'], string_contains: customername } },
          { details: { path: ['firstNameTh'], string_contains: customername } },
          { details: { path: ['lastNameTh'], string_contains: customername } },
          {
            details: {
              path: ['customerNameTh'],
              string_contains: customername,
            },
          },
          { details: { path: ['firstNameEn'], string_contains: customername } },
          { details: { path: ['firstNameEn'], string_contains: customername } },
          {
            details: {
              path: ['customerNameEn'],
              string_contains: customername,
            },
          },
        ],
      });
    }
    // if (!ownerUserGroup.exceptionalSatatus) {
    //   whereAnd.push({
    //     OR: [
    //       { responsibleId: { hasSome: userid } },
    //       { responsibleGroup: { hasSome: ownerGroups } },
    //     ],
    //   });
    // }
    Logger.debug(whereAnd);

    const findCondition = {
      where: {
        // ...(customerGroupId && { customerGroupId: customerGroupId }),
        deleteStatus: false,
        ...(refcode && { referenceCode: { contains: refcode } }),
        ...(activestatus && { activeStatus: JSON.parse(activestatus) }),
        ...(whereAnd.length > 0 && { AND: whereAnd }),
      },
      ...(take && { take: Number(take) }),
      ...(skip && { skip: Number(skip) }),
    } as Prisma.customerDetailFindManyArgs;

    const countCondition = {
      where: {
        // ...(customerGroupId && { customerGroupId: customerGroupId }),
        deleteStatus: false,
        ...(refcode && { referenceCode: { contains: refcode } }),
        ...(activestatus && { activeStatus: JSON.parse(activestatus) }),
        ...(whereAnd.length > 0 && { AND: whereAnd }),
      },
    } as Prisma.customerDetailCountArgs;
    const data = await this.customerDetailRepo.findMany(findCondition);
    const count = await this.customerDetailRepo.count(countCondition);

    return { data: data, count: count };
  }
  findContractCompany() {
    return this.contractCompanyRepo.findMany({});
  }
  findConfigCustomerTypeGroup() {
    return this.customerTypeGroupRepo.findMany({
      where: { activeStatus: true },
    });
  }
  findConfigCustomerType() {
    return this.customerTypeRepo.findMany({
      where: { activeStatus: true },
    });
  }
  findConfigExpenseType() {
    return this.expenseTypeRepo.findMany({});
  }
  findConfigCustomerResponsible() {
    return this.customerResponsibleRepo.findMany({
      where: { activeStatus: true },
    });
  }
  async findListByCustomerGroup(id: number) {
    return this.customerDetailRepo.findMany({ where: { customerGroupId: id } });
  }
  async findConfigForTicket() {
    const channelTypeList = await this.customerChannelTypeRepo.findMany({
      where: { activeStatus: true },
      orderBy: { id: 'asc' },
    });
    const jobTypeList = await this.customerJobTypeRepo.findMany({
      where: { activeStatus: true },
      orderBy: { id: 'asc' },
    });
    const priorityList = await this.customerPriorityRepo.findMany({
      where: { activeStatus: true },
      orderBy: { id: 'asc' },
    });
    const workTypeList = await this.customerWorkTypeRepo.findMany({
      where: { activeStatus: true },
      orderBy: { id: 'asc' },
    });
    const requestTypeList = await this.customerRequestTypeRepo.findMany({
      where: { activeStatus: true },
      orderBy: { id: 'asc' },
      include: { customerJobType: true },
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
    const project = await this.customerProjectRepo.findMany({
      where: {
        customerBranch: { customerDetailSub: { customerDetailId: id } },
      },
    });
    if (project) {
      return this.customerDetailRepo.update({
        where: { id: id },
        data: { deleteStatus: true },
      });
    } else {
      return this.customerDetailRepo.delete({ where: { id: id } });
    }
  }
}
