import { Injectable, Logger } from '@nestjs/common';
import {
  ImageLocationRepository,
  InventoryRepository,
  LocationRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { promises as fsPromises } from 'fs';
@Injectable()
export class LocationService {
  constructor(
    private locationRepo: LocationRepository,
    private inventoryRepo: InventoryRepository,
    private imagelocationRepo: ImageLocationRepository,
  ) {}

  async create(data: Prisma.locationCreateInput, inventory: string[]) {
    const condition = { data: data } as Prisma.locationCreateArgs;
    const addLocation = await this.locationRepo.create(condition);
    if (addLocation) {
      if (inventory) {
        inventory?.map((event: string, index: number) => {
          this.inventoryRepo.update({
            where: { inventoryId: event },
            data: { location: { connect: { id: addLocation.id } } },
          });
        });
      }
      // const findInventory = await this.inventoryRepo.findAll();
      // if (findInventory && inventory !== undefined) {
      //   inventory.map((event: any, index: number) => {
      //     findInventory
      //       .filter((filtets: any) => filtets.InventoryId === event)
      //       .map(async (event: any, row: any) => {
      //         const mapdata = {
      //           data: {
      //             locationId: addLocation.locationId,
      //             InventoryNumber: event.InventoryNumber,
      //             InventoryName: event.InventoryName,
      //             status: event.status,
      //             locationPlace: event.location_place,
      //             phoneNumber: event.phoneNumber,
      //           },
      //         } as Prisma.inventoryCreateArgs;
      //         const createinven = await this.inventoryRepo.create(mapdata);
      //         return createinven;
      //       });
      // });
    }
    return addLocation;
  }

  async createImages(id: number, body: any) {
    return body.forEach(async (element) => {
      const data = {
        idfile: element.filename,
        path: element.path,
        namefile: element.originalname,
        updatedAt: new Date(),
        images_location: Number(id),
      } as Prisma.imagesLocationCreateManyInput;
      return await this.imagelocationRepo.createImagesLocation(data);
    });
  }

  findAll() {
    return this.locationRepo.findAll();
  }

  async findMany(condition: Prisma.locationFindManyArgs) {
    condition = {
      ...condition,

      include: {
        locationUserGroupMap: true,
        imagesLocation: true,
        inventory: true,
      },
      orderBy: { id: 'asc' },
    } as Prisma.locationFindManyArgs;
    return await this.locationRepo.findMany(condition);
  }
  async findByUserGroup(userGroup: string[]) {
    if (userGroup && userGroup.length > 0) {
      const condition = {
        where: {
          locationUserGroupMap: { some: { userGroupId: { in: userGroup } } },
          status: true,
        },
        include: {
          inventory: true,
        },
        orderBy: { id: 'asc' },
      } as Prisma.locationFindManyArgs;
      return await this.locationRepo.findMany(condition);
    } else {
      return [];
    }
  }

  async update(id: number, data: Prisma.locationUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.locationUpdateArgs;
    const updateLocation = await this.locationRepo.update(condition);
    // if (update_location && inventory !== undefined) {
    //   const deleteInventory = await this.inventoryRepo.deleteMany({
    //     where: { locationId: update_location.locationId },
    //   });
    //   if (deleteInventory) {
    //     const inventorySet = inventory.map((value: any) => ({
    //       InventoryNumber: value.InventoryNumber,
    //       InventoryName: value.InventoryName,
    //       status: value.status,
    //       location_place: value.location_place,
    //       phone_number: value.phone_number,
    //       locationId: update_location.locationId,
    //     }));

    //     const update_inventory = await this.inventoryRepo.createMany({
    //       data: inventorySet,
    //     });
    //     return update_inventory;
    //   }
    //   return deleteInventory;
    // }
    return updateLocation;
  }

  async remove(locationId: number, id: number) {
    const condition = { where: { id: id } } as Prisma.locationDeleteArgs;
    const deleteLocation = await this.locationRepo.delete(condition);
    if (deleteLocation) {
      const conditioniamge = {
        where: { images_location: locationId },
      };
      const images = await this.imagelocationRepo.findMany(conditioniamge);
      images.map((image) => {
        this.deleteFile(image.path);
      });
      await this.imagelocationRepo.deleteMany(conditioniamge);
      // return deleteImage;
    }
    return deleteLocation;
  }

  async removeImage(images_location: string) {
    const condition = {
      where: { images_location: Number(images_location) },
    };
    const images = await this.imagelocationRepo.findMany(condition);
    images.map((image) => {
      this.deleteFile(image.path);
    });
    return await this.imagelocationRepo.deleteMany(condition);
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
