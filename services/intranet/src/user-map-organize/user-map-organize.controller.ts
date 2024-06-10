import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserMapOrganizeService } from './user-map-organize.service';
import { CreateUserMapOrganizeDto } from './dto/create-user-map-organize.dto';
import { UpdateUserMapOrganizeDto } from './dto/update-user-map-organize.dto';

@Controller('user-map-organize')
export class UserMapOrganizeController {
  constructor(
    private readonly userMapOrganizeService: UserMapOrganizeService,
  ) {}

  @Post()
  create(@Body() createUserMapOrganizeDto: CreateUserMapOrganizeDto) {
    return this.userMapOrganizeService.create(createUserMapOrganizeDto);
  }

  @Get()
  findAll() {
    return this.userMapOrganizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMapOrganizeService.findOne(+id);
  }

  @Get('byposition/:position_id')
  findByPositionId(@Param('position_id') positionId: string) {
    return this.userMapOrganizeService.findByPositionId(positionId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserMapOrganizeDto: UpdateUserMapOrganizeDto,
  ) {
    return this.userMapOrganizeService.update(+id, updateUserMapOrganizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMapOrganizeService.remove(id);
  }
}
