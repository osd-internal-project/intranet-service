import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdCheckingData } from 'src/id24/id24.service';
import { UserType } from './type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.usersService.findAll(query);
  }

  @Post('check-id')
  // @UseInterceptors(UserInterceptor)
  validateCheck(
    @Body()
    body: IdCheckingData,
    @Req() req: any,
  ) {
    const token = req.body.sub;
    return this.usersService.validateCheck(body);
  }

  @Post('validate/email')
  // @UseInterceptors(UserInterceptor)
  async validateEmail(@Body('email') email: string) {
    return this.usersService.validateEmail(email);
  }

  @Post('validate/username')
  // @UseInterceptors(UserInterceptor)
  async validateUserName(
    @Body('username') username: string,
    @Body('type') type: UserType.LDAP | UserType.Local,
  ) {
    return this.usersService.validateUserName(username, type);
  }

  @Post('validate/password')
  // @UseInterceptors(UserInterceptor)
  validatePassword(@Body('password') password: string) {
    return this.usersService.validatePassword(password);
  }

  @Get('groups')
  // @UseInterceptors(UserInterceptor)
  getGroups() {
    return this.usersService.getGroups();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
