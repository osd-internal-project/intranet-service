import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { TransactionRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { Workbook } from 'exceljs';
import { dateToStringTh, formatNumberDecimal } from 'src/utils';
import { createExcelBuffer } from 'src/utils/excel.service';
@Injectable()
export class ReportTransactionService {
  constructor(private transactionRepo: TransactionRepository) {}

  findAll() {
    return this.transactionRepo.findAll();
  }

  findMany(query: Prisma.transactionFindManyArgs) {
    return this.transactionRepo.findMany({
      ...query,
      orderBy: { id: 'desc' },
    });
  }

  count(query: Prisma.transactionCountArgs) {
    return this.transactionRepo.count({ ...query });
  }

  async transferExcel(condition: Prisma.transactionWhereInput, status: string) {
    const data = this.transactionRepo.findMany({
      where: condition,
      orderBy: { id: 'desc' },
    });
    const transfer = (await data).map((d) => ({
      'CAS NO.': d.casNo,
      'PRODUCT NAME': d.productName,
      DEPARTMENT: d.location,
      INVENTORY: d.inventory,
      VENDER: d.vender,
      BRAND: d.brand,
      ...(status === 'pay'
        ? {
            STATUS: d.status === 'recieve' ? 'รับเข้า' : 'เบิกจ่าย',
            'ORDER STATUS': d.orderStatus ? d.orderStatus : '',
            OBJECTIVE: d.objective ? d.objective : '',
            'REQUESTER NAME': d.requesterName ? d.requesterName : '',
            'REQUESTER GROUP': d.requesterGroupName ? d.requesterGroupName : '',
          }
        : { STATUS: d.status === 'recieve' ? 'รับเข้า' : 'เบิกจ่าย' }),
      QTY: formatNumberDecimal(d.qty),
      UNIT: d.unit,
      'ORDER DATE': dateToStringTh(d.updatedAt),
      'RESOPNSIBLE PRESON': d.updatedByName,
    }));
    const sheetName =
      status === 'pay' ? 'รายงานการเบิกจ่ายสารเคมี' : 'รายงานการรับเช้าสารเคมี';
    return createExcelBuffer(transfer, sheetName);
  }
}
