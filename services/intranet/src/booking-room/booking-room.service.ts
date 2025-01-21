import { Injectable } from '@nestjs/common';
import { BookingRoomRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingRoomService {
  constructor(private bookingRoomRepository: BookingRoomRepository) {}
  create(data: Prisma.bookingRoomCreateInput) {
    const condition = { data: data } as Prisma.bookingRoomCreateArgs;
    return this.bookingRoomRepository.create(condition);
  }

  async findAll(token: string) {
    return this.bookingRoomRepository.findAll();
  }

  async findMany(skip: number, take: number, token: string) {
    const condition = { skip, take } as Prisma.bookingRoomFindFirstArgsBase;
    const count = await this.bookingRoomRepository.count({});
    const result = await this.bookingRoomRepository.findMany(condition);
    return { data: result, count: count };
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingRoom`;
  }
  countBookingRoomCountByRoomAndRange(
    roomId: string,
    startDate: string,
    endDate: string,
  ) {
    return this.bookingRoomRepository.count({
      where: {
        roomId: roomId,
        bookingStatus: 'Approve',
        OR: [
          { startDate: { gte: new Date(startDate), lte: new Date(endDate) } },
          { endDate: { gte: new Date(startDate), lte: new Date(endDate) } },
          {
            startDate: { lte: new Date(startDate) },
            endDate: { gte: new Date(endDate) },
          },
        ],
      },
    });
  }
  async update(id: number, data: Prisma.bookingRoomUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.bookingRoomUpdateArgs;
    return await this.bookingRoomRepository.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.bookingRoomDeleteArgs;
    return await this.bookingRoomRepository.delete(condition);
  }
}
