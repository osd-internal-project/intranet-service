import { Injectable } from '@nestjs/common';
import { handbookFileRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { promises as fsPromises } from 'fs';

@Injectable()
export class handbookFileService {
  [x: string]: any;
  constructor(private readonly handbookFileRepo: handbookFileRepository) {}

  create(data: Prisma.handbookFileCreateArgs) {
    return this.handbookFileRepo.create(data);
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

  // findOnes(condition: Prisma.handbookFileFindFirstArgs) {
  //   return this.handbookFileRepo.findOne(condition);
  // }

  update(handbookid: number, condition: Prisma.handbookFileUpdateArgs) {
    const base = {
      where: {
        handbookid: handbookid,
      },
      data: { ...condition },
    } as Prisma.handbookFileUpdateArgs;
    return this.handbookFileRepo.update(base);
  }

  async remove(handbookid: number) {
    const condition = {
      where: {
        handbookid: handbookid,
      },
    };
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
}
