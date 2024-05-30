import { Injectable } from '@nestjs/common';
import { CreateResultCleanlineDto } from './dto/create-result-cleanline.dto';
import { UpdateResultCleanlineDto } from './dto/update-result-cleanline.dto';

@Injectable()
export class ResultCleanlinesService {
  create(createResultCleanlineDto: CreateResultCleanlineDto) {
    return 'This action adds a new resultCleanline';
  }

  findAll() {
    return `This action returns all resultCleanlines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resultCleanline`;
  }

  update(id: number, updateResultCleanlineDto: UpdateResultCleanlineDto) {
    return `This action updates a #${id} resultCleanline`;
  }

  remove(id: number) {
    return `This action removes a #${id} resultCleanline`;
  }
}
