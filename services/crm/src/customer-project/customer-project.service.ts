import { AccessService, CustomerProjectRepository } from '@inventory/share';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerProjectService {
  constructor(
    private readonly customerProjectRepo: CustomerProjectRepository,
    private readonly accessService: AccessService,
  ) {}
  create(data: Prisma.customerProjectCreateInput) {
    return this.customerProjectRepo.create({ data: data });
  }
  findAll() {
    return this.customerProjectRepo.findAll();
  }
  findMany(condition: Prisma.customerProjectFindManyArgs) {
    return this.customerProjectRepo.findMany(condition);
  }
  async findDatatable(query: any) {
    const {
      projectname,
      productname,
      projectcode,
      fdate,
      ldate,
      take,
      skip,
      userid,
    } = query;
    const ownerUserGroup = await this.accessService.getOwnerGroupByUserId(
      userid,
    );
    const saleUsers = await this.accessService.getSaleUsersBySalePermission(
      userid,
    );
    const engineerUsers =
      await this.accessService.getEngineerUsersBySalePermission(userid);
    const whereAnd = [];
    if (fdate && ldate) {
      whereAnd.push({
        OR: [
          {
            startDate: { lte: new Date(ldate) },
            endDate: { gte: new Date(fdate) },
          },
          {
            startDate: { gte: new Date(fdate) },
            endDate: { lte: new Date(ldate) },
          },
        ],
      });
    }
    if (!ownerUserGroup.exceptionalSatatus) {
      whereAnd.push({
        OR: [
          { saleId: { in: [...saleUsers, userid] } },
          { projectManagerId: { in: [...engineerUsers, userid] } },
        ],
      });
    }

    const data = await this.customerProjectRepo.findMany({
      where: {
        ...(projectcode && { projectCode: { contains: projectcode } }),
        ...(projectname && { projectName: { contains: projectname } }),
        ...(productname && { productName: { contains: productname } }),
        AND: whereAnd,
      },

      include: {
        customerBranch: {
          select: {
            branchCode: true,
            branchName: true,
            customerDetailSub: {
              select: { code: true, name: true },
            },
            customerDetail: true,
          },
        },
      },
      ...(take && { take: Number(take) }),
      ...(skip && { skip: Number(skip) }),
    });
    const count = await this.customerProjectRepo.count({
      where: {
        ...(projectcode && { projectCode: { contains: projectcode } }),
        ...(projectname && { projectName: { contains: projectname } }),
        ...(productname && { productName: { contains: productname } }),
        AND: whereAnd,
      },
    });
    return { data: data, count: count };
  }

  findOneById(id: number) {
    return this.customerProjectRepo.findOne({ where: { id: id } });
  }
  findDetailById(id: number) {
    return this.customerProjectRepo.findOne({
      where: { id: id },
      include: {
        contractCompany: true,
        customerBranch: {
          select: {
            branchCode: true,
            branchName: true,
            customerDetailSub: {
              select: { code: true, name: true },
            },
            customerDetail: true,
          },
        },
      },
    });
  }
  findProjectsByProductIdAndParentId(
    productid: number,
    parentid: number,
    type: string,
  ) {
    if (type === 'customer-group') {
      return this.customerProjectRepo.findMany({
        where: {
          customerProjectProductMap: { some: { customerProductId: productid } },
          customerBranch: { customerDetail: { customerGroupId: parentid } },
        },
        select: {
          id: true,
          projectCode: true,
          projectName: true,
          createdAt: true,
          startDate: true,
          endDate: true,
          customerBranch: {
            select: {
              branchName: true,
              customerDetail: { select: { details: true } },
            },
          },
        },
      });
    } else if (type === 'customer') {
      return this.customerProjectRepo.findMany({
        where: {
          customerProjectProductMap: { some: { customerProductId: productid } },
          customerBranch: { customerDetailId: parentid },
        },
        select: {
          id: true,
          projectCode: true,
          projectName: true,
          createdAt: true,
          startDate: true,
          endDate: true,
          customerBranch: {
            select: {
              branchName: true,
              customerDetail: { select: { details: true } },
            },
          },
        },
      });
    } else if (type === 'branch') {
      return this.customerProjectRepo.findMany({
        where: {
          customerProjectProductMap: { some: { customerProductId: productid } },
          customerBranchId: parentid,
        },
        select: {
          id: true,
          projectCode: true,
          projectName: true,
          createdAt: true,
          startDate: true,
          endDate: true,
          customerBranch: {
            select: {
              branchName: true,
              customerDetail: {
                select: {
                  details: true,
                },
              },
            },
          },
        },
      });
    } else {
      return [];
    }
  }
  update(id: number, data: Prisma.customerProjectUpdateInput) {
    return this.customerProjectRepo.update({ where: { id: id }, data: data });
  }

  remove(id: number) {
    return this.customerProjectRepo.delete({ where: { id: id } });
  }
}
