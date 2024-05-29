import { UserService } from '../user/user.service';
import { UserGroupMapService } from '../user-group-map/user-group-map.service';
import { UserRoleMapService } from '../user-role-map/user-role-map.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
  Req,
  Logger,
  Patch,
  Query,
  Param,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthguardService, AuthGuard } from '@inventory/share';
import { jwtConfig } from './config';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly userGroupMapService: UserGroupMapService,
    private readonly userRoleMapService: UserRoleMapService,
    private readonly authguardService: AuthguardService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Req() req) {
    const { user } = req;
    return await this.userService.findByUserId(user.userId);
  }

  //Login
  @Post('login')
  async logIn(@Body() signInDto: Record<string, any>) {
    const condition = {
      where: { username: signInDto.username, activeStatus: true },
    } as Prisma.userFindFirstArgs;
    const user = await this.userService.findOneByCondition(condition);

    if (!user) {
      throw new NotFoundException();
    }
    const comparePassowrd = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!comparePassowrd) {
      throw new UnauthorizedException();
    }
    const {
      userId,
      username,
      firstNameTh,
      lastNameTh,
      email,
      phoneNumber,
      ownerGroupId,
    } = user;

    const payload = {
      userId,
      username,
      firstNameTh,
      lastNameTh,
      email,
      phoneNumber,
      ownerGroup: ownerGroupId,
    };
    const token = this.authguardService.createToken(payload);
    // const accessToken = this.jwtService.sign(payload, {
    //   secret: jwtConfig.secret,
    //   expiresIn: jwtConfig.expires,
    // });

    // const refreshToken = this.jwtService.sign(payload, {
    //   secret: jwtConfig.secret,
    //   expiresIn: jwtConfig.refreshExpires,
    // });
    await this.userService.updateRefreshToken(user.userId, token.refreshToken);

    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }
  @Get('/permission/:userid')
  async getPermission(@Param('userid') userId: string) {
    const grouplist = await this.userGroupMapService.findGrouplistByUserId(
      userId,
    );
    const rulelist = await this.userRoleMapService.findRulelistByUserId(userId);
    return { rulelist: rulelist, grouplist: grouplist };
  }

  @UseGuards(AuthGuard)
  @Post('/signout')
  async logOut(@Req() req) {
    const { user } = req;
    await this.userService.updateRefreshToken(user.userId, null);
    return { message: 'Logged Out' };
  }

  @Post('/refresh')
  async refresh(@Body() body) {
    const { refreshToken } = body;

    if (!refreshToken) {
      Logger.error('Not found RefreshToken');
      throw new UnauthorizedException('refreshToken invalid');
    }

    try {
      // const payload = await this.jwtService.verifyAsync(refreshToken, {
      //   secret: jwtConfig.secret,
      // });
      const payload = await this.authguardService.getTokenpayload(refreshToken);

      const user = await this.userService.findByUserId(payload.userId);
      if (!user) {
        Logger.error('Not found User ');
        throw new UnauthorizedException('refreshToken invalid!');
      }
      Logger.warn(user);
      Logger.warn(
        '-------------------- Old Refresh Token --------------------',
      );
      Logger.warn(refreshToken);
      if (user.refreshToken !== refreshToken) {
        Logger.error(' refreshToken in User was wrong ');
        throw new UnauthorizedException('user refreshToken invalid!');
      }

      const {
        userId,
        username,
        firstNameTh,
        lastNameTh,
        email,
        phoneNumber,
        ownerGroupId,
      } = payload;
      const newPayload = {
        userId,
        username,
        firstNameTh,
        lastNameTh,
        email,
        phoneNumber,
        ownerGroup: ownerGroupId,
      };

      const token = this.authguardService.createToken(newPayload);
      Logger.warn(
        '-------------------- New Refresh Token --------------------',
      );
      Logger.warn(token.refreshToken);
      const updated = await this.userService.updateRefreshToken(
        user.userId,
        token.refreshToken,
      );
      Logger.debug(updated);
      return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    } catch (err) {
      Logger.error(`Error: ${err} `);
      throw new UnauthorizedException('refreshToken invalid!');
    }
  }

  @UseGuards(AuthGuard)
  @Post('/change-password')
  async changePassword(@Req() req, @Body() body) {
    const { user } = req;
    const { username, password, newPassword } = body;
    const findUser = await this.userService.findByUsername(username);
    if (!findUser) {
      throw new NotFoundException();
    }
    const comparePassowrd = await bcrypt.compare(password, user.password);

    if (!comparePassowrd) {
      throw new UnauthorizedException();
    }

    const hashpassword = await bcrypt.hash(newPassword, 10);

    const data = {
      password: hashpassword,
    };

    return await this.userService.update(findUser.userId, data);
  }

  @UseGuards(AuthGuard)
  @Patch('/reset-password')
  async resetPassowrd(@Body() body) {
    const { userId, newPassword } = body;
    const findUser = await this.userService.findByUserId(userId);
    if (!findUser) {
      throw new NotFoundException();
    }
    const resetPassword = newPassword;
    const hashpassword = await bcrypt.hash(resetPassword, 10);
    const data = {
      password: hashpassword,
    };

    return await this.userService.update(userId, data);
  }
}
