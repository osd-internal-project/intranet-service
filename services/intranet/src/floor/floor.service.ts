import { Injectable } from '@nestjs/common';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { FloorRepository } from '@inventory/share';

@Injectable()
export class FloorService {
  constructor(private floorRepo: FloorRepository) {}

  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }
  create(createFloorDto: CreateFloorDto) {
    return this.floorRepo.create({
      data: {
        floorName: createFloorDto.floorName,
        floorId: createFloorDto.floorId,
      },
    });
  }

  findAll() {
    return this.floorRepo.findAll();
  }

  findCount(query) {
    let filter = {};
    filter = query.floorName
      ? { floorName: { contains: query.floorName } }
      : {};
    if (query.createdAt) {
      const startTrackDate = this.startOfDate(
        query.createdAt[0].replace(/"/g, ''),
      ).toISOString();
      const endTrackDate = this.endOfDate(
        query.createdAt[1].replace(/"/g, ''),
      ).toISOString();
      filter = {
        ...filter,
        createdAt: {
          gte: startTrackDate,
          lte: endTrackDate,
        },
      };
    }
    if (query.updatedAt) {
      const startTrackDate = this.startOfDate(
        query.updatedAt[0].replace(/"/g, ''),
      ).toISOString();
      const endTrackDate = this.endOfDate(
        query.updatedAt[1].replace(/"/g, ''),
      ).toISOString();
      filter = {
        ...filter,
        updatedAt: {
          gte: startTrackDate,
          lte: endTrackDate,
        },
      };
    }
    return this.floorRepo.count({ where: filter });
  }

  findMany(query) {
    let filter = {};
    filter = query.floorName
      ? { floorName: { contains: query.floorName } }
      : {};
    if (query.createdAt) {
      const startTrackDate = this.startOfDate(
        query.createdAt[0].replace(/"/g, ''),
      ).toISOString();
      const endTrackDate = this.endOfDate(
        query.createdAt[1].replace(/"/g, ''),
      ).toISOString();
      filter = {
        ...filter,
        createdAt: {
          gte: startTrackDate,
          lte: endTrackDate,
        },
      };
    }
    if (query.updatedAt) {
      const startTrackDate = this.startOfDate(
        query.updatedAt[0].replace(/"/g, ''),
      ).toISOString();
      const endTrackDate = this.endOfDate(
        query.updatedAt[1].replace(/"/g, ''),
      ).toISOString();
      filter = {
        ...filter,
        updatedAt: {
          gte: startTrackDate,
          lte: endTrackDate,
        },
      };
    }
    return this.floorRepo.findMany({ where: filter });
  }
  findOne(id: number) {
    return `This action returns a #${id} floor`;
  }

  update(floorId: number, updateFloorDto: UpdateFloorDto) {
    return this.floorRepo.update({
      where: { floorId: floorId },
      data: { floorName: updateFloorDto.floorName },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} floor`;
  }
}
