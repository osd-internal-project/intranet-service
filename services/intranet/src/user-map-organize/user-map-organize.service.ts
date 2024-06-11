import { Injectable } from '@nestjs/common';
import { CreateUserMapOrganizeDto } from './dto/create-user-map-organize.dto';
import { UpdateUserMapOrganizeDto } from './dto/update-user-map-organize.dto';
import { UserMapOrganizeChartRepository } from '@inventory/share';

@Injectable()
export class UserMapOrganizeService {
  constructor(
    private readonly userMapOrganizeChartRepo: UserMapOrganizeChartRepository,
  ) {}
  create(createUserMapOrganizeDto: CreateUserMapOrganizeDto) {
    return this.userMapOrganizeChartRepo.create({
      data: {
        positionId: createUserMapOrganizeDto.positionId,
        userId: createUserMapOrganizeDto.userId,
      },
    });
  }

  findAll() {
    return `This action returns all userMapOrganize`;
  }

  findByPositionId(positionId: string) {
    return this.userMapOrganizeChartRepo.findMany({
      where: { positionId: positionId },
      select: {
        users: { select: { userId: true, username: true, email: true } },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} userMapOrganize`;
  }

  update(id: number, updateUserMapOrganizeDto: UpdateUserMapOrganizeDto) {
    return `This action updates a #${id} userMapOrganize`;
  }

  remove(id: string) {
    return this.userMapOrganizeChartRepo.deleteMany({ where: { userId: id } });
  }
}
