import { Injectable } from '@nestjs/common';
import { handbookFileRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { promises as fsPromises } from 'fs';

@Injectable()
export class handbookFileService {
  [x: string]: any;
  constructor(
    private readonly handbookFileRepo: handbookFileRepository,
  ) {}

  async create(data: Prisma.handbookFileCreateArgs) {
    const handbook = await this.handbookFileRepo.create(data);
    return handbook;
  }

  async update(handbookid: number, condition: Prisma.handbookFileUpdateArgs) {
    const handbook = await this.handbookFileRepo.update({
      where: { handbookid },
      data: { ...condition },
    });

    return handbook;
  }

  findAll(condition: Prisma.handbookFileFindManyArgs) {
    return this.handbookFileRepo.findMany({
      ...condition,
      orderBy: {
        handbookid: 'asc',
      },
    });
  }

  findOne(handbookid: number) {
    const base = {
      where: {
        handbookid: handbookid,
      },
    };

    return this.handbookFileRepo.findOne(base);
  }

  async remove(handbookid: number) {
    const condition = { where: { handbookid } };
    const filespdf = await this.handbookFileRepo.findMany(condition);

    filespdf.map((filespdf) => {
      this.deleteFile(filespdf.fileLocation);
    });

    return this.handbookFileRepo.delete(condition);
  }

  async deleteFile(fileLocation: string) {
    const filePath = `${fileLocation}`;
    try {
      await fsPromises.unlink(filePath);
      console.log(`File ${fileLocation} has been deleted successfully.`);
    } catch (err) {
      console.error(`Error deleting file ${fileLocation}: ${err.message}`);
    }
  }

  findOnes(condition: Prisma.handbookFileFindFirstArgs) {
    return this.handbookFileRepo.findOne(condition);
  }

  findHandbookFilesAll(condition: Prisma.handbookFileFindManyArgs) {
    return this.handbookFileRepo.findMany({
      ...condition,
      orderBy: {
        handbookid: 'desc',
      },
    });
  }
}
