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
import { ContactService } from './contact.service';
import { Prisma } from '@prisma/client';
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // @Post('condition')
  // findByCondition(@Body('condition') condition: Prisma.contactFindManyArgs) {
  //   return this.contactService.findByCondition(condition);
  // }

  // @Patch()
  // update(@Body('id') id: number, @Body('data') data: Prisma.venderUpdateInput) {
  //   return this.contactService.update(id, data);
  // }

  // @Delete(':venderID')
  // remove(@Param('venderID') venderID: string) {
  //   const deleted = this.contactService.remove(venderID);
  //   if (deleted) {
  //     return this.contactService.removeContact(venderID);
  //   }
  //   return deleted;
  // }
}
