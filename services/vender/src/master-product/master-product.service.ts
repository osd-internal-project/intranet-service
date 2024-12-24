import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  InventoryLotRepository,
  InventoryStockRepository,
  MasterProductRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { promises as fsPromises } from 'fs';
import { env } from 'process';
import { equal } from 'assert';
@Injectable()
export class MasterProductService {
  constructor(
    private masterProductRepo: MasterProductRepository,
    private inventoryStockRepo: InventoryStockRepository,
    private inventoryLotRepo: InventoryLotRepository,
  ) {}

  create(data: Prisma.masterProductCreateInput) {
    const condition = { data: data } as Prisma.masterProductCreateArgs;
    return this.masterProductRepo.create(condition);
  }

  findAll() {
    return this.masterProductRepo.findAll();
  }

  count() {
    const condition = {} as Prisma.masterProductCountArgs;
    return this.masterProductRepo.count(condition);
  }

  async countoutofstock() {
    const getmasterProduct = await this.masterProductRepo.findAll();

    const data = await Promise.all(
      getmasterProduct.map(async (event: any) => {
        const condition = {
          where: { masterProductId: event.id },
        };
        const getinventoryStrockByID = await this.inventoryStockRepo.findMany(
          condition,
        );
        let Remains = 0;
        await Promise.all(
          getinventoryStrockByID.map(async (event: any) => {
            const condition = {
              where: { inventoryStockId: event.id },
            };
            const result = await this.inventoryLotRepo.findMany(condition);
            result.map((event: any) => {
              Remains = event.remain > 0 ? event.remain : null;
            });
          }),
        );
        const mapdata = {
          ...event,
          remains: Remains,
        };
        return mapdata;
      }),
    );
    const res = data?.map((event: any) => {
      let count = 0;
      return (count += event.remains < event.minimumStock ? 1 : 0);
    });
    const totalCount = await res.reduce((acc, curr) => acc + curr, 0);
    return totalCount;
  }

  async findMany(condition: Prisma.masterProductWhereInput) {
    const base = {
      where: {
        ...condition,
        // details: { path: ['name[*]'], arr: 'oxigen' },
      },
      select: {
        id: true,
        masterProductDetails: true,
        chemicalFormula: true,
        description: true,
        casNo: true,
        venderId: true,
        venderName: true,
        brandId: true,
        brandName: true,
        masterProductGhsMap: {
          select: {
            masterGhsType: {
              select: {
                id: true,
                ghsId: true,
                nameGhs: true,
                imagesGhs: { select: { idfile: true } },
              },
            },
          },
        },
        masterProductHazardtypeMap: {
          select: {
            masterHazardtype: { select: { id: true, nameHazard: true } },
          },
        },
        unitId: true,
        unit: { select: { unitName: true } },
        masterProductGroupId: true,
        masterProductGroup: {
          select: {
            groupName: true,
            masterProductCategories: { select: { categoryName: true } },
            masterProductGroupMapType: {
              select: {
                typeName: true,
              },
            },
          },
        },
        hyperlink: true,
        masterProductImages: true,
        createdAt: true,
        notiExpiry: true,
        beforeExpiry: true,
        minimumStock: true,
        maximumStock: true,
        updatedByName: true,
        masterProductFiles: true,
        inventoryStock: true,
      },
      orderBy: { createdAt: 'asc' },
    } as Prisma.masterProductFindManyArgs;
    const data = await this.masterProductRepo.findMany(base);

    return data;
  }

  async findById(id: number) {
    if (id === undefined || null) return null;
    const base = {
      where: {
        id: id,
        // details: { path: ['name[*]'], arr: 'oxigen' },
      },
      select: {
        id: true,
        masterProductDetails: true,
        chemicalFormula: true,
        description: true,
        casNo: true,
        venderId: true,
        brandId: true,
        undertaker: true,
        masterProductLocationMap: true,
        masterProductHazardtypeMap: {
          select: {
            masterHazardtype: { select: { id: true, nameHazard: true } },
          },
        },
        masterProductGhsMap: {
          select: {
            masterGhsType: {
              select: {
                id: true,
                ghsId: true,
                nameGhs: true,
                imagesGhs: { select: { idfile: true } },
              },
            },
          },
        },
        unitId: true,
        unit: { select: { unitName: true } },
        masterProductGroupId: true,
        masterProductGroup: {
          select: {
            groupName: true,
            masterProductCategories: {
              select: { id: true, categoryName: true },
            },
            masterProductGroupMapType: {
              select: {
                typeName: true,
              },
            },
          },
        },
        hyperlink: true,
        masterProductImages: true,
        createdAt: true,
        notiExpiry: true,
        beforeExpiry: true,
        minimumStock: true,
        maximumStock: true,
        updatedByName: true,
        masterProductFiles: true,
        inventoryStock: true,
      },
      orderBy: { createdAt: 'asc' },
    } as Prisma.masterProductFindManyArgs;
    const data = await this.masterProductRepo.findFirst(base);

    return data;
  }

  async findByInventoryId(
    inventoryId: number,
    condition: Prisma.masterProductWhereInput,
    minimumstatus: boolean,
  ) {
    console.log(minimumstatus);

    const base = {
      where: {
        ...condition,
        masterProductLocationMap: {
          some: {
            location: {
              inventory: {
                some: {
                  id: inventoryId,
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        masterProductDetails: true,
        chemicalFormula: true,
        description: true,
        casNo: true,
        brandName: true,
        venderName: true,
        hyperlink: true,
        masterProductGhsMap: {
          select: {
            masterGhsType: {
              select: {
                id: true,
                ghsId: true,
                nameGhs: true,
                imagesGhs: { select: { idfile: true } },
              },
            },
          },
        },
        masterHazardtype: true,
        unit: { select: { unitName: true } },
        masterProductGroup: {
          select: {
            id: true,
            groupName: true,
            masterProductCategories: { select: { categoryName: true } },
            masterProductGroupMapType: {
              select: {
                typeName: true,
              },
            },
          },
        },
        masterProductImages: true,
        createdAt: true,
        notiExpiry: true,
        beforeExpiry: true,
        inventoryStock: {
          where: { inventoryId: inventoryId },
          select: {
            id: true,
            inventoryLot: { take: 1 },
          },
        },
        updatedByName: true,
        minimumStock: true,
        maximumStock: true,
        masterProductFiles: true,
      },
      orderBy: [{ id: 'asc' }],
    } as Prisma.masterProductFindManyArgs;

    const result = await this.masterProductRepo.findMany(base);
    const LastResult = await Promise.all(
      result.map(async (event: any, index: number) => {
        let usableRemain = 0;
        if (event?.inventoryStock.length > 0) {
          await Promise.all(
            event?.inventoryStock.map(async (e: any) => {
              const condition = {
                where: {
                  inventoryStockId: e.id,
                  expiryDate: { gt: new Date() },
                  remain: { gt: 0 },
                },
                _sum: { remain: true },
              } as Prisma.InventoryLotAggregateArgs;
              const data = await this.inventoryLotRepo.aggregate(condition);
              const summary = data._sum.remain ? data._sum.remain : 0;
              usableRemain += summary ? summary : 0;
            }),
          );
        }
        const mapdata = {
          ...event,
          calTotalQty: usableRemain,
        };
        return mapdata;
      }),
    );
    if (minimumstatus === true) {
      const test = LastResult.filter((data) => {
        return data?.minimumStock > data?.calTotalQty;
      });
      return test;
    }

    return LastResult;
  }

  async findBylocationId(
    locationId: number,
    condition: Prisma.masterProductWhereInput,
    minimumStatus: boolean,
  ) {
    const base = {
      where: {
        ...condition,
        masterProductLocationMap: {
          some: {
            locationId: locationId,
          },
        },
      },
      select: {
        id: true,
        masterProductLocationMap: {
          select: {
            location: { select: { locationName: true } },
          },
        },
        masterProductDetails: true,
        chemicalFormula: true,
        description: true,
        venderName: true,
        brandName: true,
        casNo: true,
        hyperlink: true,
        masterProductHazardtypeMap: {
          select: {
            masterHazardtype: { select: { id: true, nameHazard: true } },
          },
        },
        masterProductGhsMap: {
          select: {
            masterGhsType: {
              select: {
                id: true,
                ghsId: true,
                nameGhs: true,
                imagesGhs: { select: { idfile: true } },
              },
            },
          },
        },
        unit: { select: { unitName: true } },
        masterProductGroup: {
          select: {
            groupName: true,
            masterProductCategories: { select: { categoryName: true } },
            masterProductGroupMapType: {
              select: {
                typeName: true,
              },
            },
          },
        },

        masterProductImages: true,
        createdAt: true,
        notiExpiry: true,
        beforeExpiry: true,
        inventoryStock: {
          where: { inventory: { is: { locationId: locationId } } },
          select: {
            id: true,
            inventoryLot: { take: 1 },
          },
        },
        updatedByName: true,
        minimumStock: true,
        maximumStock: true,
        masterProductFiles: true,
      },
      orderBy: { createdAt: 'asc' },
    } as Prisma.masterProductFindManyArgs;
    const result = await this.masterProductRepo.findMany(base);
    const LastResult = await Promise.all(
      result.map(async (event: any, index: number) => {
        let usableRemain = 0;
        if (event?.inventoryStock.length > 0) {
          await Promise.all(
            event?.inventoryStock.map(async (e: any) => {
              const condition = {
                where: {
                  inventoryStockId: e.id,
                  expiryDate: { gt: new Date() },
                  remain: { gt: 0 },
                },
                _sum: { remain: true },
              } as Prisma.InventoryLotAggregateArgs;
              const data = await this.inventoryLotRepo.aggregate(condition);
              const summary = data._sum.remain ? data._sum.remain : 0;
              usableRemain += summary ? summary : 0;
            }),
          );
        }
        const mapdata = {
          ...event,
          calTotalQty: usableRemain,
        };
        return mapdata;
      }),
    );
    if (minimumStatus === true) {
      const test = LastResult.filter((data) => {
        return data?.minimumStock > data?.calTotalQty;
      });
      return test;
    }
    return LastResult;
  }

  async findProductInInventoryByProductId(productId: number) {
    const base = {
      where: {
        id: productId,
      },
      select: {
        id: true,
        unit: { select: { unitName: true } },
        inventoryStock: {
          select: {
            id: true,
            totalQty: true,
            totalRemain: true,
            inventory: {
              select: {
                inventoryName: true,
                location: { select: { locationId: true, locationName: true } },
                locationPlace: true,
              },
            },
          },
        },
      },
    } as Prisma.masterProductFindFirstArgs;
    return await this.masterProductRepo.findFirst(base);
  }

  async update(id: number, data: Prisma.masterProductUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.masterProductUpdateArgs;
    return await this.masterProductRepo.update(condition);
  }

  async remove(pid: string) {
    const id = Number(pid);
    const product = (await this.masterProductRepo.findFirst({
      where: { id: id },
      select: { masterProductImages: true },
    })) as any;
    if (product?.masterProductImages) {
      product?.masterProductImages.map((image: any) =>
        this.deleteFile(image.path),
      );
    }

    if (id) {
      const condition = {
        where: { id: Number(id) },
      } as Prisma.masterProductDeleteArgs;
      const check = await this.inventoryStockRepo.findMany({
        where: { masterProductId: Number(id) },
        select: { inventoryLot: { select: { id: true, remain: true } } },
      });
      let status = true;
      if (check.length > 0) {
        check.map((data: any) =>
          data.inventoryLot.map((d: any) => {
            if (d.remain > 0) {
              status = false;
            }
          }),
        );
      }
      if (status === true) {
        return await this.masterProductRepo.delete(condition);
      } else {
        throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
    }
    return null;
  }

  async deleteFile(path: string) {
    const filePath = `${path}`;
    try {
      await fsPromises.unlink(filePath);
      console.log(`File ${path} has been deleted successfully.`);
    } catch (err) {
      console.error(`Error deleting file ${path}: ${err.message}`);
    }
  }
}
