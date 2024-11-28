import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeProfileService } from './employee-profile.service';
import { Prisma } from '@prisma/client';

@Controller('employee-profile')
export class EmployeeProfileController {
  constructor(
    private readonly employeeProfileService: EmployeeProfileService,
  ) {}

  @Post()
  create(@Body() createEmployeeProfile: Prisma.employeeProfilesCreateInput) {
    return this.employeeProfileService.create(createEmployeeProfile);
  }

  @Get()
  findAll() {
    return this.employeeProfileService.findAll();
  }
  @Get(':take/:skip')
  findByCondition(@Param('take') take: string, @Param('skip') skip: string) {
    return this.employeeProfileService.findMany(+take, +skip);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.employeeProfileService.findOne(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeProfile: Prisma.employeeProfilesUpdateInput,
  ) {
    return this.employeeProfileService.update(+id, updateEmployeeProfile);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeProfileService.remove(+id);
  }
}
