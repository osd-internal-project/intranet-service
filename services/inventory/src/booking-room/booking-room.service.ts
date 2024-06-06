import { Injectable } from '@nestjs/common';
import {
  BookingRoomRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingRoomService {
  constructor(
    private bookingRoomRepository: BookingRoomRepository,
  ) { }
  create(data: Prisma.bookingRoomCreateInput) {
    console.log(data);
    const condition = { data: data } as Prisma.bookingRoomCreateArgs;
    return this.bookingRoomRepository.create(condition);
  }

  findAll() {
    return this.bookingRoomRepository.findAll();
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
