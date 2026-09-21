import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessService } from '../access/access.service';
import { decodeToken } from '../interceptor/user.interceptor';
import { ROLES_KEY, RoleCode } from './roles.decorator';

/**
 * ตรวจสิทธิ์จาก role code ของผู้เรียก
 *
 * Guard ทำงานก่อน interceptor จึงถอด payload เองไม่พึ่ง UserInterceptor
 * สิทธิ์ที่ใช้ตัดสิน = สิทธิ์จาก ID24 token รวมกับสิทธิ์ของกลุ่มต้นสังกัด (union)
 * ให้ตรงกับ mergedRoleCodes ใน intranet-console/app/page/layout.tsx
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly accessService: AccessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<RoleCode[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    if (!authorization) {
      throw new ForbiddenException('No Auth');
    }

    const payload = decodeToken(authorization);
    const tokenRoles = (payload.access?.userAccess ?? []).flatMap(
      (item) => item.roles ?? [],
    );

    // token ให้ sub มาเป็น users.token จึงต้อง map กลับเป็น userId ก่อนหาสิทธิ์ของกลุ่ม
    const user = await this.accessService.findUserByToken(payload.sub);
    const groupRoles = user
      ? await this.accessService.getRoleCodesByUserId(user.userId)
      : [];

    const roles = new Set([...tokenRoles, ...groupRoles]);
    if (!required.some((code) => roles.has(code))) {
      throw new ForbiddenException('Insufficient role');
    }
    // ให้ handler ใช้ต่อได้โดยไม่ต้อง query ซ้ำ
    request['roleCodes'] = Array.from(roles);
    return true;
  }
}
