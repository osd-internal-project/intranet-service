import { UserService } from '../user/user.service';
import { UserGroupMapService } from '../user-group-map/user-group-map.service';
import { UserRoleMapService } from '../user-role-map/user-role-map.service';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
  Req,
  Logger,
  Patch,
  Param,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthguardService, AuthGuard } from '@inventory/share';
import { authenticate } from 'ldap-authentication';
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
      where: {
        username: signInDto.username,
        activeStatus: true,
      },
      include: {
        masterPosition: true,
        userMapOrganizeChart: {
          select: {
            positionId: true,
          },
        },
        userMapOrganizeGroupOwner: {
          select: { ownerGroupId: true },
        },
      },
    } as Prisma.usersFindFirstArgs;

    const createTokenAndReturn = async (user: any) => {
      console.log(user);

      const {
        userId,
        username,
        firstNameTh,
        lastNameTh,
        email,
        phoneNumber,
        ownerGroupId,
        firstNameEn,
        lastNameEn,
        masterPosition,
        userMapOrganizeChart,
        userMapOrganizeGroupOwner,
        departmentId,
      } = user;
      const payload = {
        userId,
        username,
        firstNameTh,
        lastNameTh,
        firstNameEn,
        lastNameEn,
        email,
        phoneNumber,
        ownerGroup: ownerGroupId,
        position: masterPosition,
        userMapOrganizeChart: userMapOrganizeChart,
        userMapOwnerGroupId: userMapOrganizeGroupOwner,
        departmentId,
      };
      const token = this.authguardService.createToken(payload);
      await this.userService.updateRefreshToken(
        user.userId,
        token.refreshToken,
      );

      return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    };

    if (signInDto.type === 'ldap') {
      const authenticated = await authenticate({
        ldapOpts: { url: 'ldap://192.168.99.1' },
        userDn: `${signInDto.username}@osd.co.th`,
        userPassword: signInDto.password,
      });

      if (authenticated) {
        const user = await this.userService.findOneByCondition(condition);

        if (!user) {
          const createUserData = { username: signInDto.username };
          const newUser = await this.userService.defaultUser(createUserData);

          return createTokenAndReturn(newUser);
        }

        return createTokenAndReturn(user);
      } else {
        throw new UnauthorizedException('LDAP authentication failed.');
      }
    } else {
      const user = await this.userService.findOneByCondition(condition);
      if (!user) {
        throw new NotFoundException();
      }

      const comparePassword = await bcrypt.compare(
        signInDto.password,
        user.password,
      );

      if (!comparePassword) {
        throw new UnauthorizedException();
      }

      return createTokenAndReturn(user);
    }
  }

  @Get('/permission/:userid')
  async getPermission(@Param('userid') userId: string) {
    const getPermissionByUserId = await this.userService.getPermissionByUserId(
      userId,
    );
    return getPermissionByUserId;
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
        masterPosition,
        firstNameEn,
        lastNameEn,
      } = payload;
      const newPayload = {
        userId,
        username,
        firstNameTh,
        lastNameTh,
        email,
        phoneNumber,
        ownerGroup: ownerGroupId,
        position: masterPosition,
        firstNameEn,
        lastNameEn,
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
