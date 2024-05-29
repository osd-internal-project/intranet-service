import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  InventoryLotRepository,
  MasterProductRepository,
  TransactionRepository,
} from '@inventory/share';
import { Prisma, PrismaClient, masterProduct } from '@prisma/client';
import { Workbook } from 'exceljs';
import {
  dateToStringTh,
  formatNumberDecimal,
  dateToStringThNoTime,
} from 'src/utils';
import { createExcelBuffer } from 'src/utils/excel.service';
const prisma = new PrismaClient();
@Injectable()
export class ReportTransactionExpiredService {
  constructor(
    private transactionRepo: TransactionRepository,
    private masterProductRepo: MasterProductRepository,
    private inventoryLotRepo: InventoryLotRepository,
  ) {}

  findAll() {
    return this.transactionRepo.findAll();
  }

  async findMany(
    query: object,
    pagination: {
      current: number;
      pageSize: number;
    },
  ) {
    const condition = {
      where: {
        ...query,
      },
      select: {
        id: true,
        lotNo: true,
        venderName: true,
        brandName: true,
        remain: true,
        expiryDate: true,
        inventoryStock: {
          select: {
            masterProduct: {
              select: {
                casNo: true,
                masterProductDetails: { select: { name: true } },
                chemicalFormula: true,
                masterProductGroup: true,
                unit: true,
              },
            },
            inventory: {
              select: {
                inventoryName: true,
                location: { select: { locationName: true } },
              },
            },
          },
        },
      },
      take: pagination.pageSize,
      skip: (pagination.current - 1) * 10,
    } as Prisma.inventoryLotFindManyArgs;

    return this.inventoryLotRepo.findMany(condition);
  }

  count(query: Prisma.inventoryLotCountArgs) {
    return this.inventoryLotRepo.count({ ...query });
  }

  async transferExcel(query: Prisma.transactionFindManyArgs) {
    const condition = {
      where: { ...query },
      select: {
        id: true,
        lotNo: true,
        venderName: true,
        brandName: true,
        remain: true,
        expiryDate: true,
        inventoryStock: {
          select: {
            masterProduct: {
              select: {
                casNo: true,
                masterProductDetails: { select: { name: true } },
                chemicalFormula: true,
                masterProductGroup: true,
                unit: true,
              },
            },
            inventory: {
              select: {
                inventoryName: true,
                location: { select: { locationName: true } },
              },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    } as Prisma.inventoryLotFindManyArgs;

    const data = (await this.inventoryLotRepo.findMany(condition)) as any;
    const transfer = (await data).map((d) => {
      return {
        'LOT NO.': d?.lotNo,
        'CAS NO.': d?.inventoryStock?.masterProduct?.casNo,
        'PRODUCT NAME': d?.inventoryStock?.masterProduct?.masterProductDetails
          .map((d: { name: string }) => d?.name)
          .join(', '),
        DEPARTMENT:
          d?.inventoryStock?.inventory?.location?.locationName !== null
            ? d?.inventoryStock?.inventory?.location?.locationName
            : '-',
        INVENTORY: d?.inventoryStock?.inventory?.inventoryName,
        'CHEMICAL FORMULA': d?.inventoryStock?.masterProduct?.chemicalFormula,
        GROUP: d?.inventoryStock?.masterProduct?.masterProductGroup?.groupName,
        VENDER: d?.venderName,
        BRAND: d?.brandName,
        'EXPRIED DATE': dateToStringThNoTime(d?.expiryDate),
        'QTY (EXP)': formatNumberDecimal(d?.remain),
        UNIT: d?.inventoryStock?.masterProduct?.unit?.unitName,
      };
    });

    return createExcelBuffer(transfer, 'รายงานการหมดอายุของสารเคมี');
  }
}
