import { Injectable } from '@nestjs/common';
import { CreateMasterTypeEventDto } from './dto/create-master-type-event.dto';
import { UpdateMasterTypeEventDto } from './dto/update-master-type-event.dto';

@Injectable()
export class MasterTypeEventsService {
  create(createMasterTypeEventDto: CreateMasterTypeEventDto) {
    return 'This action adds a new masterTypeEvent';
  }

  findAll() {
    return `This action returns all masterTypeEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterTypeEvent`;
  }

  update(id: number, updateMasterTypeEventDto: UpdateMasterTypeEventDto) {
    return `This action updates a #${id} masterTypeEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterTypeEvent`;
  }
}
