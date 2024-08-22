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
        idbook: 'asc',
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

  update(idbook: number, condition: Prisma.handbookFileUpdateArgs) {
    const base = {
      where: {
        idbook: idbook,
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
