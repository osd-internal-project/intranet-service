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
  ModuleTypes,
  UsersRepository,
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
    private readonly usersRepo: UsersRepository,
    private readonly accessService: AccessService,
  ) {}

  async create(data: Prisma.customerDetailCreateInput) {
    try {
      const responsible = data.responsible as any;
      let responsibleGroup = [];
      if (responsible) {
        const userids = responsible.map(
          (data: { uid: string; name: string }) => data.uid,
        );
        if (userids && userids.length > 0) {
          const responsibleUsers = await this.usersRepo.findMany({
            where: { userId: { in: userids } },
          });

          responsibleGroup = responsibleUsers.map((data) => data.ownerGroupId);
        }
      }
      const condition = {
        data: { ...data, responsibleGroup: responsibleGroup },
      } as Prisma.customerDetailCreateArgs;

      return this.customerDetailRepo.create(condition);
    } catch (error) {
      Logger.error(error);
      return error;
    }
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
    try {
      const {
        customerName,
        referenceCode,
        customerSubName,
        productName,
        userid,
        customerGroupId,
      } = search || {};
      // const { take, skip, userid } = query;
      Logger.debug(search);
      const accessGroups = await this.accessService.getAccessedGroupByUserId(
        ModuleTypes.CRM_SALE_PROJECT,
        userid,
      );
      const accessGroupIds = accessGroups.map((group) => group.groupId);
      const whereAnd = [];
      console.log(customerGroupId);
      if (customerGroupId) {
        whereAnd.push({
          customerGroupId: +customerGroupId,
        });
      }
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
      if (customerSubName) {
        whereAnd.push({
          customerDetailSub: {
            some: { name: { contains: customerSubName } },
          },
        });
      }
      if (productName) {
        whereAnd.push({
          customerDetailSub: {
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
        whereAnd.push({
          referenceCode: {
            contains: referenceCode,
          },
        });
      }
      const findCondition = {
        where: {
          ...(whereAnd.length > 0 && { AND: whereAnd }),
          OR: [
            { responsibleGroup: { hasSome: accessGroupIds } },
            { responsibleId: { hasSome: userid } },
          ],
          deleteStatus: false,
        },
      } as Prisma.customerDetailFindManyArgs;

      const countCondition = {
        where: {
          ...(whereAnd.length > 0 && { AND: whereAnd }),
          OR: [
            { responsibleGroup: { hasSome: accessGroupIds } },
            { responsibleId: { hasSome: userid } },
          ],
          deleteStatus: false,
        },
      } as Prisma.customerDetailCountArgs;
      const data = await this.customerDetailRepo.findMany(findCondition);
      const count = await this.customerDetailRepo.count(countCondition);

      return { data: data, count: count };
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }
  findActiveForProject() {
    return this.customerDetailRepo.findMany({
      where: { deleteStatus: false, activeStatus: true },
      orderBy: { createdAt: 'asc' },
    });
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
  async findListByCustomerGroup(id: number, token: string) {
    console.log(id);
    const user = await this.usersRepo.findOne({ where: { token: token } });
    const accessUsers = await this.accessService.getAccessedGroupByUserId(
      ModuleTypes.CRM_SALE_PROJECT,
      user.userId,
    );
    console.log(accessUsers);
    if (accessUsers.length > 0) {
      return this.customerDetailRepo.findMany({
        where: { customerGroup: { id: id } },
      });
    } else {
      return [];
    }
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
    Logger.debug({ id: id, data: data });
    let responsibleGroup = [];
    if (responsible) {
      const userids = responsible.map(
        (data: { uid: string; name: string }) => data.uid,
      );
      if (userids && userids.length > 0) {
        const responsibleUsers = await this.usersRepo.findMany({
          where: { userId: { in: userids } },
        });

        responsibleGroup = responsibleUsers.map((data) => data.ownerGroupId);
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
        customerDetailSub: { customerDetailId: id },
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
