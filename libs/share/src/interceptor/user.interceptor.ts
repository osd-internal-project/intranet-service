import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
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
    const payload = verifyToken(token);
    request.body['sub'] = payload.sub;
    // RolesGuard อ่าน role จาก payload ก้อนนี้ต่อ
    request['user'] = payload;
    return next.handle();
  }
}

/**
 * ตรวจลายเซ็น ID24 token แล้วคืน payload
 * @param bearerToken ค่าดิบของ header Authorization
 * @returns payload ที่ผ่านการตรวจลายเซ็นแล้ว
 */
export function verifyToken(bearerToken: string): Id24TokenPayload {
  const id24TokenPublicKeyBase64 = process.env['ID24_TOKEN_PUBLIC_KEY'];
  if (!id24TokenPublicKeyBase64) {
    throw new ForbiddenException('ID24_TOKEN_PUBLIC_KEY is not configured');
  }
  const id24TokenPublicKey = Buffer.from(
    id24TokenPublicKeyBase64,
    'base64',
  ).toString('ascii');
  const [type, rawToken] = bearerToken.split(' ');
  const token = type === 'Bearer' ? rawToken : bearerToken;
  try {
    return JWT.verify(token, id24TokenPublicKey, {
      algorithms: ['RS256'],
    }) as Id24TokenPayload;
  } catch (e) {
    throw new ForbiddenException(e.message);
  }
}
