import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { CustomerFilesRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { promises as fsPromises } from 'fs';
@Injectable()
export class CustomerFilesService {
  constructor(private readonly customerFilesRepo: CustomerFilesRepository) {}
  create(data: Prisma.customerFilesCreateInput) {
    return this.customerFilesRepo.create({ data: data });
  }

  findAll() {
    return this.customerFilesRepo.findAll({});
  }

  findOne(condition: Prisma.customerFilesFindFirstArgs) {
    return this.customerFilesRepo.findOne(condition);
  }
  findMany(condition: Prisma.customerFilesFindManyArgs) {
    return this.customerFilesRepo.findAll(condition);
  }
  async remove(id: number) {
    const data = await this.customerFilesRepo.findOne({
      where: { id: id },
    });
    const deleted = await this.deleteFile(data.path);
    if (deleted) {
      return this.customerFilesRepo.delete({ where: { id: id } });
    } else {
      throw new BadRequestException('Error deleting file');
    }
  }

  async deleteFile(path: string) {
    const filePath = `${path}`;
    try {
      await fsPromises.unlink(filePath);
      console.log(`File ${path} has been deleted successfully.`);
      return true;
    } catch (err) {
      console.error(`Error deleting file ${path}: ${err.message}`);
      return false;
    }
  }
}
