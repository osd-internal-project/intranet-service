import { PrismaService } from '@inventory/share';
import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
@Controller('public')
export class PublicController {
  constructor(private prisma: PrismaService) {}
  @Get('user-profile')
  async getProfileUsers(@Query('emp') empId: string, @Res() res: Response) {
    const userProfile = await this.prisma.users.findMany({
      where: {
        empId: { contains: empId },
      },
      include: {
        masterPosition: {
          select: {
            nameEn: true,
          },
        },
      },
      orderBy: { empId: 'asc' },
    });
    const count = await this.prisma.users.count({
      where: {
        empId: { contains: empId },
      },
    });
    return res.status(200).json({ data: userProfile, count });
  }
}
