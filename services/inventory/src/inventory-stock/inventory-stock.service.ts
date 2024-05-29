import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  InventoryStockRepository,
  FileRecieveStockRepository,
  TransactionRepository,
  MasterProductRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

@Injectable()
export class InventoryStockService {
  constructor(
    private inventoryStockRepo: InventoryStockRepository,
    private fileRecieveRepo: FileRecieveStockRepository,
    private transactionRepo: TransactionRepository,
    private masterProductRepo: MasterProductRepository,
  ) {}
  async create(
    data: any,
    inventoryId: string,
    masterProductId: string,
    inventoryName: string,
  ) {
    const masterproduct = (await this.masterProductRepo.findOne({
      where: {
        masterProductLocationMap: {
          some: {
            location: {
              inventory: {
                some: {
                  id: Number(inventoryId),
                },
              },
            },
            masterProductId: Number(masterProductId),
          },
        },
      },
      include: {
        unit: true,
        masterProductDetails: true,
        masterProductGroup: true,
        masterProductLocationMap: {
          include: {
            location: true,
          },
        },
      },
    })) as any;
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '');
    const generateRandomNumber = (length: any) => {
      let result = '';
      const characters = '0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    };
    const randomNumber = generateRandomNumber(3);

    const result = data?.inventoryLot?.createMany?.data?.map(
      (event: any, index: number) => {
        const notiExpiryDate = new Date(event.expiryDate);
        notiExpiryDate.setDate(
          notiExpiryDate.getDate() - masterproduct.beforeExpiry,
        );
        const mapdata = {
          ...event,
          lotNo: `${formattedDate}${index}${randomNumber}`,
          qty: Number(event.qty),
          totalPrice: Number(event.totalPrice),
          price: Number(
            (Number(event.totalPrice) / Number(event.qty)).toFixed(6),
          ),
          notiExpiryStatus: masterproduct.notiExpiry,
          notiExpiryDate: notiExpiryDate,
          remain: Number(event.qty),
          updateId: data.updateId,
        };

        return mapdata;
      },
    );

    const condition = {
      data: {
        ...data,
        inventoryLot: { createMany: { data: result } },
        updateAt: new Date(),
      },
    } as Prisma.inventoryStockCreateArgs;

    const rescreatestock = await this.inventoryStockRepo.create(condition);
    if (rescreatestock) {
      await data?.data?.inventoryLot?.createMany?.data?.map(
        async (event: any) => {
          const condition = {
            data: {
              productName:
                masterproduct?.masterProductDetails.length > 0
                  ? masterproduct.masterProductDetails
                      .map((d: any) => d.name)
                      .join(', ')
                  : '',
              location:
                masterproduct?.masterProductLocationMap[0]?.location
                  .locationName,
              locationId:
                masterproduct?.masterProductLocationMap[0]?.location.id,
              inventory: inventoryName,
              inventoryId: Number(inventoryId),
              chemicalFormula: masterproduct.chemicalFormula,
              groupId: String(masterproduct.masterProductGroup.id),
              groupName: masterproduct.masterProductGroup.groupName,
              casNo: event.casNo,
              vender: event.venderName,
              brand: event.brandName,
              status: 'recieve',
              qty: Number(event.qty),
              price: Number(
                (Number(event.totalPrice) / Number(event.qty)).toFixed(6),
              ),
              unit: masterproduct.unit.unitName,
              updatedAt: new Date(),
              updatedById: data.data.updateId,
              updatedByName: data.data.updateName,
              expiredDate: data.expiryDate,
            },
          } as Prisma.transactionCreateArgs;
          return await this.transactionRepo.create(condition);
        },
      );
    }
    return rescreatestock;
  }

  async createImages(id: string, body: any) {
    return body.forEach(async (element) => {
      const data = {
        idfile: element.filename,
        path: element.path,
        namefile: element.originalname,
        updatedAt: new Date(),
        inventoryLotId: id,
      } as Prisma.fileRecieveCreateInput;
      return await this.fileRecieveRepo.createfileRecieve(data);
    });
  }

  findAll() {
    return this.inventoryStockRepo.findAll();
  }

  findMany(condition: Prisma.inventoryStockFindManyArgs) {
    return this.inventoryStockRepo.findMany(condition);
  }

  findByInventoryId(
    inventoryId: number,
    productConditon: Prisma.masterProductWhereInput,
  ) {
    const condition = {
      where: {
        inventoryId: Number(inventoryId),
        masterProduct: productConditon,
      },
      include: {
        inventoryLot: true,
        masterProduct: true,
        inventory: true,
      },
    } as Prisma.inventoryStockFindManyArgs;
    return this.inventoryStockRepo.findMany(condition);
  }

  async update(
    inventoryId: number,
    productId: number,
    data: any,
    masterProductId: string,
    inventoryName: string,
    casNo: string,
  ) {
    const stock = await this.inventoryStockRepo.findOne({
      where: { inventoryId: inventoryId, masterProductId: productId },
    });
    const masterproduct = (await this.masterProductRepo.findOne({
      where: {
        masterProductLocationMap: {
          some: {
            location: {
              inventory: {
                some: {
                  id: inventoryId,
                },
              },
            },
            masterProductId: Number(masterProductId),
          },
        },
      },
      include: {
        unit: true,
        masterProductDetails: true,
        masterProductGroup: true,
        masterProductLocationMap: {
          include: {
            location: true,
          },
        },
      },
    })) as any;

    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '');
    const generateRandomNumber = (length: any) => {
      let result = '';
      const characters = '0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    };
    const randomNumber = generateRandomNumber(3);
    if (stock) {
      const result = await data?.inventoryLot?.createMany?.data?.map(
        (event: any, index: number) => {
          const notiExpiryDate = new Date(event.expiryDate);
          notiExpiryDate.setDate(
            notiExpiryDate.getDate() - masterproduct.beforeExpiry,
          );
          const mapdata = {
            ...event,
            lotNo: `${formattedDate}${index}${randomNumber}`,
            qty: Number(event.qty),
            totalPrice: Number(event.totalPrice),
            price: Number(
              (Number(event.totalPrice) / Number(event.qty)).toFixed(6),
            ),
            remain: Number(event.qty),
            updateId: data.updateId,
            notiExpiryStatus: masterproduct.notiExpiry,
            notiExpiryDate: notiExpiryDate,
          };

          return mapdata;
        },
      );
      const condition = {
        where: { id: stock.id },
        data: {
          inventoryLot: {
            createMany: {
              data: result,
            },
          },
          updateAt: new Date(),
        },
      } as Prisma.inventoryStockUpdateArgs;
      const resupdatestock = await this.inventoryStockRepo.update(condition);
      if (resupdatestock) {
        await data?.inventoryLot?.createMany?.data?.map(async (event: any) => {
          const condition = {
            data: {
              productName:
                masterproduct?.masterProductDetails.length > 0
                  ? masterproduct?.masterProductDetails
                      ?.map((detail) => detail.name)
                      .join(', ')
                  : '',
              location:
                masterproduct.masterProductLocationMap[0].location.locationName,
              locationId: masterproduct.masterProductLocationMap[0].location.id,
              inventory: inventoryName,
              inventoryId: inventoryId,
              chemicalFormula: masterproduct.chemicalFormula,
              groupId: String(masterproduct.masterProductGroup.id),
              groupName: masterproduct.masterProductGroup.groupName,
              casNo: casNo,
              vender: event.venderName,
              brand: event.brandName,
              status: 'recieve',
              qty: Number(event.qty),
              price: Number(
                (Number(event.totalPrice) / Number(event.qty)).toFixed(6),
              ),
              unit: masterproduct.unit.unitName,
              updatedAt: new Date(),
              updatedById: data.updateId,
              updatedByName: data.updateName,
              ownerGroup: data.ownerGroup,
              expiredDate: data.expiryDate,
            },
          } as Prisma.transactionCreateArgs;
          return await this.transactionRepo.create(condition);
        });
      }
      return resupdatestock;
    } else {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.inventoryStockDeleteArgs;
    return await this.inventoryStockRepo.delete(condition);
  }

  findLotById(id: number) {
    const condition = {
      where: {
        id: Number(id),
      },
      include: { inventoryLot: true },
    } as Prisma.inventoryStockArgs;
    return this.inventoryStockRepo.findMany(condition);
  }

  countInventoryStock(inventoryId: number, productId: number) {
    const condition = {
      where: { inventoryId: inventoryId, masterProductId: productId },
    } as Prisma.inventoryStockCountArgs;
    return this.inventoryStockRepo.count(condition);
  }
}
