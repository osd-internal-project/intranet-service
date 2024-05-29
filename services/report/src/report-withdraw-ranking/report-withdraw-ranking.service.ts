import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MasterProductRepository } from '@inventory/share';
import { Prisma, PrismaClient } from '@prisma/client';
import { dateToStringTh, formatNumberDecimal } from 'src/utils';
import { createExcelBuffer } from 'src/utils/excel.service';
const prisma = new PrismaClient();
@Injectable()
export class ReportWithdrawRankingService {
  constructor(private masterProductRepo: MasterProductRepository) {}

  findAll() {
    return this.masterProductRepo.findAll();
  }

  async findMany(query: any) {
    const { casNo, productName, locationId, startDate, endDate } = query;
    let whereCondition = ``;
    if (locationId && locationId !== undefined) {
      whereCondition += ` and location_id = ${locationId}`;
    } else if (productName && productName !== undefined) {
      whereCondition += ` and product_name like '%${productName}%'`;
    } else if (casNo && casNo !== undefined) {
      whereCondition += ` and cas_no like '%${casNo}%'`;
    }
    if (startDate && endDate) {
      const sql = `select
      max(product_code) as productcode,
      max(product_name) as productname,
      cas_no as casno ,
      max(location) as location , 
      max(location_id) as locationId,
      max(chemical_formula) as chemicalformula,
      max(group_name) as groupname,
      max(vender) as vender,
      max(brand) as brand,
      sum(qty) as qty,
      sum(price) as price,
      max(unit) as unit,
      max(updated_at) as updatedat
    from
      transaction t
    where
      order_status = 'done' AND updated_at between '${startDate}' and '${endDate}' ${whereCondition}
    group by
      cas_no order by qty desc LIMIT 10`;
      Logger.debug(sql);
      const result = await prisma.$queryRaw(Prisma.raw(sql));
      return result;
    } else {
      return [];
    }

    // Logger.debug(result);
  }

  async transferExcel(query: any) {
    const data = this.findMany(query) as any;
    // const data = this.transactionRepo.findMany({
    //   ...condition,
    //   orderBy: { id: 'desc' },
    // });
    const transfer = (await data).map((d) => ({
      'CAS NO.': d.casno,
      'PRODUCT NAME': d.productname,
      DEPARTMENT: d.location,
      'CHEMICAL FORMULA': d.chemicalformula,
      GROUP: d.groupname,
      VENDER: d.vender,
      BRAND: d.brand,
      QTY: d.qty ? formatNumberDecimal(Number(d.qty)) : '',
      UNIT: d.unit,
      'LAST ORDER DATE': dateToStringTh(d.updatedat),
      'ORDER AMOUNT': formatNumberDecimal(d.price),
    }));
    console.log(transfer);
    return createExcelBuffer(transfer, '10 อันดับการเบิกจ่ายที่มากที่สุด');
  }
}
