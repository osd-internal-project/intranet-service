import { Injectable } from '@nestjs/common';
import { CreateOrganizeChartDto } from './dto/create-organize-chart.dto';
import { UpdateOrganizeChartDto } from './dto/update-organize-chart.dto';
import { OrganizedChartRepository } from '@inventory/share';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class OrganizeChartService {
  constructor(private readonly organizedChartRepo: OrganizedChartRepository) {}
  create(createOrganizeChartDto: CreateOrganizeChartDto) {
    return this.organizedChartRepo.create({ data: createOrganizeChartDto });
  }

  findAll() {
    return this.organizedChartRepo.findAll();
  }

  findOne(id: string) {
    return this.organizedChartRepo.findFrist({
      where: {
        positionId: id,
      },
    });
  }

  findMany(query: any) {
    return this.organizedChartRepo.findMany({});
  }

  findChildrenById(rootId: string) {
    const sql = `WITH RECURSIVE OrgChartCTE AS (
      SELECT
          id,
          position_id,
          description,
          position_name,
          parent_position_id,
          created_at,
          updated_at
      FROM
          organize_chart
      WHERE
          position_id = '${rootId}'
      UNION ALL
      SELECT
          oc.id,
          oc.position_id,
          oc.description,
          oc.position_name,
          oc.parent_position_id,
          oc.created_at,
          oc.updated_at
      FROM
          organize_chart oc
      INNER JOIN OrgChartCTE cte ON cte.position_id = oc.parent_position_id
  )
  SELECT
      *
  FROM
      OrgChartCTE;`;
    return prisma.$queryRaw(Prisma.raw(sql));
  }

  update(id: string, updateOrganizeChartDto: UpdateOrganizeChartDto) {
    return this.organizedChartRepo.update({
      where: { positionId: id },
      data: updateOrganizeChartDto,
    });
  }

  remove(id: string) {
    return this.organizedChartRepo.delete({ where: { positionId: id } });
  }
}
