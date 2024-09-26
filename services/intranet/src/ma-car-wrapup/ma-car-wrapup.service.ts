import { Injectable } from '@nestjs/common';
import { MaCarWrapupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { EmailService } from '../Emailtranfer/email.service';
import { header } from '../Emailtranfer/template/macarcreate';
@Injectable()
export class MaCarWrapupService {
  constructor(
    private readonly macarwrapupRepo: MaCarWrapupRepository,
    private readonly emailService: EmailService,
  ) {}
  async create(data: Prisma.maCarWrapupCreateArgs) {
    const maCarWrapup = await this.macarwrapupRepo.create(data);
    const emailContent = header(maCarWrapup);

    await this.emailService.sendEmail(
      'aekittipon500@gmail.com',
      `การสร้าง Task ลำดับที่ ${maCarWrapup.id}`,
      emailContent,
    );
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
    return await this.macarwrapupRepo.findOne({
      where: {
        carWrapupId: carWrapupId,
      },
      include: { maCarWrapupImage: true },
    });
  }

  update(carWrapupId: string, condition: Prisma.maCarWrapupUpdateArgs) {
    const base = {
      where: {
        carWrapupId: carWrapupId,
      },
      data: { ...condition },
    } as Prisma.maCarWrapupUpdateArgs;
    return this.macarwrapupRepo.update(base);
  }

  remove(carWrapupId: string) {
    return this.macarwrapupRepo.delete({
      where: {
        carWrapupId: carWrapupId,
      },
    });
  }
}
