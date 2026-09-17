import { SetMetadata } from '@nestjs/common';

/** code สิทธิ์ของระบบ — ต้องตรงกับ ROLES ใน intranet-console/app/config/user-roles.ts */
export type RoleCode =
  | 'user'
  | 'header'
  | 'hr'
  | 'ma-user'
  | 'account'
  | 'admin';

export const ROLES_KEY = 'roles';

/**
 * กำหนดว่า route นี้เข้าถึงได้ด้วยสิทธิ์ใดบ้าง (มีสิทธิ์ใดสิทธิ์หนึ่งก็ผ่าน)
 * ต้องใช้คู่กับ UserInterceptor เสมอ เพราะ RolesGuard อ่าน payload ที่ interceptor วางไว้
 * @param roles รายการ role code ที่ยอมรับได้
 */
export const Roles = (...roles: RoleCode[]) => SetMetadata(ROLES_KEY, roles);
