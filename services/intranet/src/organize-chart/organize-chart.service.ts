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

  findByType(type: string) {
    return this.organizedChartRepo.findMany({
      where: { type: type },
      orderBy: { id: 'asc' },
    });
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

  findChildrenUserById(rootId) {
    const sql = `WITH RECURSIVE OrgChartCTE AS (
      SELECT
          oc.id,
          oc.position_id,
          oc.position_name,
          oc.parent_position_id,
          umoc."userId",
          u.username,
          u.first_name_en ,
          u.last_name_en  ,
          u.email,
          oc.type,
          u.image_id
      FROM
          organize_chart oc
      left join user_map_organize_chart umoc on umoc."positionId" = oc.position_id
      left join "users" u on u.user_id = umoc."userId"
      WHERE
          position_id = '${rootId}'
      UNION ALL
      SELECT
          oc.id,
          oc.position_id,
          oc.position_name,
          oc.parent_position_id,
          umoc."userId",
          u.username,
          u.first_name_en ,
          u.last_name_en  ,
          u.email,
          oc.type,
          u.image_id
      FROM
          organize_chart oc
      left join user_map_organize_chart umoc on umoc."positionId" = oc.position_id
      left join "users" u on u.user_id = umoc."userId"
      INNER JOIN OrgChartCTE cte ON cte.position_id = oc.parent_position_id
      where oc."type" = 'position'
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
