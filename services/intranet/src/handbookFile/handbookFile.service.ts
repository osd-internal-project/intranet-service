import { Injectable } from '@nestjs/common';
import { handbookFileRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { promises as fsPromises } from 'fs';
import { EmailService } from '../public/email.service';  // Import email service

@Injectable()
export class handbookFileService {
  [x: string]: any;
  constructor(
    private readonly handbookFileRepo: handbookFileRepository,
    private readonly emailService: EmailService,  // Inject email service
  ) {}

  async create(data: Prisma.handbookFileCreateArgs) {
    const handbook = await this.handbookFileRepo.create(data);
    
    // ส่งอีเมลแจ้งเตือนเมื่อสร้าง handbook ใหม่
    await this.emailService.sendEmail(
      // 'aekkung500@gmail.com', 
      'New Handbook Created', 
      `A new handbook with ID ${handbook.handbookid} has been created.`
    );

    return handbook;
  }

  async update(handbookid: number, condition: Prisma.handbookFileUpdateArgs) {
    const handbook = await this.handbookFileRepo.update({
      where: { handbookid },
      data: { ...condition },
    });

    // ส่งอีเมลแจ้งเตือนเมื่ออัปเดต handbook
    await this.emailService.sendEmail(
      // 'aekkung500@gmail.com',
      'Handbook Updated',
      `Handbook with ID ${handbookid} has been updated.`
    );

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

    // ส่งอีเมลแจ้งเตือนเมื่อมีการลบ handbook
    await this.emailService.sendEmail(
      // 'aekkung500@gmail.com',
      'Handbook Deleted',
      `Handbook with ID ${handbookid} has been deleted.`
    );

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
