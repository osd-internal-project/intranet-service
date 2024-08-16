import { Injectable } from '@nestjs/common';
import { AccessService, BookingRoomRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingRoomService {
  constructor(
    private bookingRoomRepository: BookingRoomRepository,
    private readonly accessService: AccessService,
  ) {}
  create(data: Prisma.bookingRoomCreateInput) {
    const condition = { data: data } as Prisma.bookingRoomCreateArgs;
    return this.bookingRoomRepository.create(condition);
  }

  async findAll() {
    return this.bookingRoomRepository.findAll();
  }

  async findMany(skip: number, take: number) {
    const condition = { skip, take } as Prisma.bookingRoomFindFirstArgsBase;
    const count = await this.bookingRoomRepository.count({});
    const result = await this.bookingRoomRepository.findMany(condition);
    return { data: result, count: count };
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingRoom`;
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
