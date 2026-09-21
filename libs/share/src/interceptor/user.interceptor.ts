import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

/** payload ของ ID24 token ส่วนที่ระบบนี้ใช้ */
export interface Id24TokenPayload {
  sub: string;
  access?: {
    organizationId?: string;
    userAccess?: { groupId: string; groupName: string; roles: string[] }[];
  };
}

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if (!token) {
      throw new ForbiddenException('No Auth');
    }
    const payload = decodeToken(token);
    request.body['sub'] = payload.sub;
    // RolesGuard อ่าน role จาก payload ก้อนนี้ต่อ
    request['user'] = payload;
    return next.handle();
  }
}

/**
 * อ่าน payload ของ ID24 token โดยไม่ตรวจลายเซ็น
 * ID24 ไม่มีช่องทางให้ดึง public key ออกมาได้ จึงตรวจลายเซ็นฝั่งนี้ไม่ได้
 * @param bearerToken ค่าดิบของ header Authorization
 * @returns payload ที่ถอดจากส่วนกลางของ token
 */
export function decodeToken(bearerToken: string): Id24TokenPayload {
  const [type, rawToken] = bearerToken.split(' ');
  const token = type === 'Bearer' ? rawToken : bearerToken;
  try {
    return JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    ) as Id24TokenPayload;
  } catch (e) {
    throw new ForbiddenException('Invalid token');
  }
}
