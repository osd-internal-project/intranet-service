import { Injectable } from '@nestjs/common';
import { CreateHousekeeperDto } from './dto/create-housekeeper.dto';
import { UpdateHousekeeperDto } from './dto/update-housekeeper.dto';
import { HouseKeeperRepository } from '@inventory/share';

@Injectable()
export class HousekeeperService {
  constructor(private houseKeeperRepo: HouseKeeperRepository) {}

  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }

  create(createHousekeeperDto: CreateHousekeeperDto) {
    return this.houseKeeperRepo.create({
      data: {
        houseKeepName: createHousekeeperDto.houseKeepName,
      },
    });
  }

  findCount(query) {
    let filter = {};
    filter = query.houseKeepName
      ? { houseKeepName: { contains: query.houseKeepName } }
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
    return this.houseKeeperRepo.count({ where: filter });
  }

  findMany(query) {
    let filter = {};
    filter = query.houseKeepName
      ? { houseKeepName: { contains: query.houseKeepName } }
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
    return this.houseKeeperRepo.findMany({ where: filter });
  }

  findAll() {
    return this.houseKeeperRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} housekeeper`;
  }

  update(houseKeeperId: number, updateHousekeeperDto: UpdateHousekeeperDto) {
    return this.houseKeeperRepo.update({
      where: { houseKeeperId: houseKeeperId },
      data: { houseKeepName: updateHousekeeperDto.houseKeepName },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} housekeeper`;
  }
}
