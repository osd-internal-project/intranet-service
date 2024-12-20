import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Logger,
  Param,
} from '@nestjs/common';
import { VenderService } from './vender.service';
import { Prisma } from '@prisma/client';
@Controller('vender')
export class VenderController {
  constructor(private readonly venderService: VenderService) {}

  @Post()
  async create(
    @Body('vender') vender: Prisma.venderCreateInput,
    @Body('contact') contact: any[],
  ) {
    const create_vender = await this.venderService.create(vender);
    if (create_vender && contact !== undefined) {
      const contactsSet = contact.map((value: any) => ({
        ...value,
        venderID: create_vender.venderID,
      }));
      const create_contact = await this.venderService.createContact(
        contactsSet,
      );
      return create_contact;
    }
    return create_vender;
  }

  @Get()
  findAll() {
    return this.venderService.findAll();
  }
  @Get('count')
  count() {
    return this.venderService.count();
  }

  @Post('condition')
  findByCondition(@Body('condition') condition: Prisma.venderFindManyArgs) {
    return this.venderService.findByCondition(condition);
  }

  @Post('condition-findfirst')
  findByConditionfindfirst(
    @Body('condition') condition: Prisma.venderFindManyArgs,
  ) {
    return this.venderService.findByOneCondition(condition);
  }

  @Post('byId')
  findById(@Body('data') where: Prisma.venderFindManyArgs) {
    return this.venderService.findByCondition(where);
  }

  @Patch()
  async update(
    @Body('number') number: string,
    @Body('vender') vender: Prisma.venderUpdateInput,
    @Body('contact') contact: any[],
  ) {
    return await this.venderService.update(number, vender, contact);
  }

  @Delete(':venderID')
  remove(@Param('venderID') venderID: string) {
    return this.venderService.remove(venderID);
  }
}
