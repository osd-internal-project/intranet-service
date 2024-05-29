import { Injectable, Logger } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { TransactionRepository } from '@inventory/share';
const prisma = new PrismaClient();
@Injectable()
export class DashboardService {
  constructor(private transactionRepo: TransactionRepository) {}

  async findMostDepartment() {
    const sql = `select l.id
    , l.location_name as department 
    , coalesce ( i.count_inventory, 0 ) as countinventory,
    coalesce ( count_order,  0 ) as countorder
    from  (  select * from location where status = true) l left join (
    select
      location_id ,
      count(id) as count_inventory
    from
      inventory
    group by
      location_id) i on
    i.location_id = l.id
  left join (
    select
      location_id ,
      count(id) as count_order
    from
      "order" WHERE created_at between date_trunc('month', now()) and  (date_trunc('month', now()) + interval '1 month - 1 day')
    group by
      location_id)
   o on
    o.location_id = l.id order by countorder desc LIMIT 5;`;
    const data = await prisma.$queryRaw(Prisma.raw(sql));
    return data;
  }

  async findCountPerMonth() {
    const sql = `select
    date_part('YEAR', updated_at) AS year,
    date_part('MONTH', updated_at) AS month,
    SUM(case when status = 'recieve' then 1 else 0 end) as recipt ,
    SUM(case when status = 'pay' then 1 else 0 end) as pay
  from
    "transaction" t
  group by
    date_part('MONTH',
    updated_at),
    date_part('YEAR',
    updated_at)
  order by
    date_part('YEAR', updated_at) desc,
    date_part('MONTH', updated_at)  desc
  limit 12;`;
    const rawData = await prisma.$queryRaw(Prisma.raw(sql));
    const chartdata = await this.mapMonth(rawData);
    return chartdata;
  }

  async findAmountPerMonth() {
    const sql = `select
    date_part('YEAR', updated_at) AS year,
    date_part('MONTH', updated_at) AS month,
    SUM(case when status = 'recieve' then price *qty else 0 end) as recipt ,
    SUM(case when status = 'pay' then price *qty else 0 end) as pay
  from
    "transaction" t
  group by
    date_part('MONTH',
    updated_at),
    date_part('YEAR',
    updated_at)
  order by
    date_part('YEAR', updated_at) desc,
    date_part('MONTH', updated_at)  desc
  limit 12;`;
    const rawData = await prisma.$queryRaw(Prisma.raw(sql));
    const chartdata = await this.mapMonth(rawData);
    return chartdata;
  }

  // Function to pad the data with missing months
  mapMonth(data) {
    // Convert the data array into a map for easier manipulation
    const dataMap = new Map(
      data.map((entry) => [entry.year * 100 + entry.month, entry]),
    );

    // Get the current year and month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is 0, so add 1

    // Loop through the last 12 months starting from the current month
    for (let i = 0; i < 12; i++) {
      // Calculate the year and month for the current iteration
      let targetYear = currentYear;
      let targetMonth = currentMonth - i;

      if (targetMonth <= 0) {
        targetYear--;
        targetMonth += 12;
      }

      // Generate the key by combining year and month as a single number
      const key = targetYear * 100 + targetMonth;

      // If the key doesn't exist in the data map, add a default entry
      if (!dataMap.has(key)) {
        dataMap.set(key, {
          year: targetYear,
          month: targetMonth,
          recipt: 0,
          pay: 0,
        });
      }
    }

    // Convert the map back to an array and sort it by year and month
    const paddedData = Array.from(dataMap.values()).sort((a: any, b: any) => {
      // Compare years
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      // Compare months
      return a.month - b.month;
    });

    return paddedData;
  }
  async findMostOrders() {
    const sql = `select		
    max(id) as id,
		max(product_name) as prductName ,
		max(cas_no) as cassNo,
		count(id) as count_order
from
		order_lot ol
group by
	cas_no
order by
	count_order desc
limit 5;`;
    const data = await prisma.$queryRaw(Prisma.raw(sql));
    return data;
  }
}
