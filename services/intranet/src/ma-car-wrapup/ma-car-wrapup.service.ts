import { Injectable } from '@nestjs/common';
import { MaCarWrapupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { EmailService } from '../Emailtranfer/email.service';
import { warpup } from '../Emailtranfer/template/warpup';
import { warpupapproved } from 'src/Emailtranfer/template/warpupappove';
import { macarbook } from 'src/Emailtranfer/template/macarbook';
@Injectable()
export class MaCarWrapupService {
  constructor(
    private readonly macarwrapupRepo: MaCarWrapupRepository,
    private readonly emailService: EmailService,
  ) {}
  async create(data: Prisma.maCarWrapupCreateInput) {
    const maCarWrapup = await this.macarwrapupRepo.create({ data: data });
    // const emailContent = warpup(maCarWrapup);
    // await this.emailService.sendEmail(
    //   'taksapongk@osd.co.th',
    //   `การสร้าง Task ลำดับที่ ${maCarWrapup.id}`,
    //   emailContent,
    // );
    return maCarWrapup;
  }

  async findAll(condition: Prisma.maCarWrapupFindManyArgs) {
    return await this.macarwrapupRepo.findMany({
      ...condition,
      orderBy: {
        id: 'asc',
      },
      include: { maCarWrapupImage: true },
    });
  }

  async findOne(carWrapupId: string) {
    const findone = {
      where: {
        carWrapupId: carWrapupId,
      },
      include: { maCarWrapupImage: true },
    };
    return await this.macarwrapupRepo.findOne(findone);
  }

  async update(carWrapupId: string, condition: Prisma.maCarWrapupUpdateArgs) {
    const base = {
      where: {
        carWrapupId: carWrapupId,
      },
      data: { ...condition },
    } as Prisma.maCarWrapupUpdateArgs;
    console.log(base);

    const updatemacar = await this.macarwrapupRepo.update(base);
    console.log(`หลังจาก${updatemacar.id}`);

    if (updatemacar.status !== null) {
      const emailContent = macarbook(updatemacar);

      console.log(`ข้างในการส่งจดหมายคือ ${emailContent}`);
      console.log(`ส่งจาก ${updatemacar.id}`);
      await this.emailService.sendEmail(
        'aekittipon500@gmail.com',
        `การอนุมัติ Task ลำดับที่ ${updatemacar.id}`,
        emailContent,
      );
    }
    return updatemacar;
  }

  remove(carWrapupId: string) {
    return this.macarwrapupRepo.delete({
      where: {
        carWrapupId: carWrapupId,
      },
    });
  }
}
