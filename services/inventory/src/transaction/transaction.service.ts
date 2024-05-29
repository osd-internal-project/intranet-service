import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp';
import { dateToStringTh, formatNumberDecimal } from 'src/utils';

@Injectable()
export class TransactionService {
  constructor(private transactionRepo: TransactionRepository) {}

  create(data: Prisma.transactionCreateInput) {
    const condition = { data: data } as Prisma.transactionCreateArgs;
    return this.transactionRepo.create(condition);
  }

  findAll() {
    return this.transactionRepo.findAll();
  }

  findMany(query: Prisma.transactionFindManyArgs) {
    return this.transactionRepo.findMany({
      ...query,
      orderBy: { id: 'desc' },
    });
  }

  async countCost(condition: any) {
    const datalotAll = await this.transactionRepo.findMany(condition);
    let CountCost = 0;
    await datalotAll.map(async (value: Prisma.transactionWhereInput) => {
      CountCost += Number(value?.price);
    });
    return CountCost;
  }

  async update(id: number, data: Prisma.transactionUpdateInput) {
    const condition = {
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    } as Prisma.transactionUpdateArgs;
    return await this.transactionRepo.updateMany(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.transactionDeleteArgs;
    return await this.transactionRepo.delete(condition);
  }

  async generateExcelData(): Promise<any[]> {
    // Your logic to generate Excel data
    const data = [
      { Name: 'John Doe', Age: 30 },
      { Name: 'Jane Doe', Age: 25 },
    ];
    return data;
  }

  async createExcelBuffer(data: any[]): Promise<Buffer> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    // Add header row
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);
    // Add data rows
    data.forEach((row) => {
      worksheet.addRow(Object.values(row));
    });
    // Obtain the buffer as Uint8Array
    const bufferArray = await workbook.xlsx.writeBuffer();
    // Convert Uint8Array to Node.js Buffer
    const buffer = Buffer.from(bufferArray);

    return buffer;
  }

  async transferExcel(condition: Prisma.transactionFindManyArgs) {
    const data = await this.transactionRepo.findMany({
      ...condition,
      orderBy: { id: 'desc' },
    });
    const transfer = (await data).map((d) => ({
      'CAS NO.': d.casNo,
      'PRODUCT NAME': d.productName,
      DEPARTMENT: d.location,
      INVENTORY: d.inventory,
      'CHEMICAL FORMULA': d.chemicalFormula,
      GROUP: d.groupName,
      VENDER: d.vender,
      BRAND: d.brand,
      STATUS: d.status === 'recieve' ? 'รับ' : 'จ่าย',
      'ORDER STATUS': d.orderStatus ? d.orderStatus : '',
      QTY: formatNumberDecimal(d.qty),
      UNIT: d.unit,
      DATE: dateToStringTh(d.updatedAt),
      'RESOPNSIBLE PRESON': d.updatedByName,
    }));
    return transfer;
  }

  countstatus(condition: Prisma.transactionCountArgs) {
    return this.transactionRepo.countstatus(condition);
  }
}
