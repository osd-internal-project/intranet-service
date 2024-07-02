import { AccessService, CustomerProjectRepository } from '@inventory/share';
import { Injectable } from '@nestjs/common';
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
    const { projectname, projectcode, fdate, ldate, take, skip, userid } =
      query;
    const ownerUserGroup = await this.accessService.getOwnerGroupByUserId(
      userid,
    );
    const saleUsers = await this.accessService.getSaleUsersBySalePermission(
      userid,
    );

    const engineerUsers =
      await this.accessService.getEngineerUsersBySalePermission(userid);
    const data = await this.customerProjectRepo.findMany({
      where: {
        ...(projectcode && { projectCode: { contains: projectcode } }),
        ...(projectname && { projectName: { contains: projectname } }),
        ...(fdate &&
          ldate && {
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
          }),
        ...(!ownerUserGroup.exceptionalSatatus && {
          OR: [
            { saleId: { in: saleUsers } },
            { projectManagerId: { in: engineerUsers } },
          ],
        }),
      },

      include: {
        customerBranch: {
          select: { branchCode: true, branchName: true, customerDetail: true },
        },
      },
      ...(take && { take: Number(take) }),
      ...(skip && { skip: Number(skip) }),
    });
    const count = await this.customerProjectRepo.count({
      where: {
        ...(projectcode && { projectCode: { contains: projectcode } }),
        ...(projectname && { projectName: { contains: projectname } }),
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
        customerBranch: {
          select: { branchCode: true, branchName: true, customerDetail: true },
        },
      },
    });
  }
  update(id: number, data: Prisma.customerProjectUpdateInput) {
    return this.customerProjectRepo.update({ where: { id: id }, data: data });
  }

  remove(id: number) {
    return this.customerProjectRepo.delete({ where: { id: id } });
  }
}
