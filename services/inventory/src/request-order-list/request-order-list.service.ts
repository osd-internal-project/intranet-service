import { Injectable } from '@nestjs/common';
import { CreateRequestOrderListDto } from './dto/create-request-order-list.dto';
import { UpdateRequestOrderListDto } from './dto/update-request-order-list.dto';
import { RequestOrderListRepository } from '@inventory/share';

@Injectable()
export class RequestOrderListService {
  constructor(
    private readonly requestorderlotRepo: RequestOrderListRepository,
  ) {}
  create(createRequestOrderListDto: CreateRequestOrderListDto) {
    return 'This action adds a new requestOrderList';
  }

  findAll() {
    return this.requestorderlotRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} requestOrderList`;
  }

  update(id: number, updateRequestOrderListDto: UpdateRequestOrderListDto) {
    return `This action updates a #${id} requestOrderList`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestOrderList`;
  }
}
