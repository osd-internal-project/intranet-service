// ต้อง import แบบ `* as` เพราะ tsconfig ของ service นี้เปิดแค่ allowSyntheticDefaultImports
// ไม่ได้เปิด esModuleInterop — ถ้าใช้ default import จะ compile ผ่านแต่พังตอน runtime
import * as dayjs from 'dayjs';

/**
 * ประเภทเอกสารตามกฎหมายของรถ
 * - insurance = ประกันภัย (มีบริษัท + ชั้นประกัน)
 * - act       = พ.ร.บ. (มีบริษัท ไม่มีชั้นประกัน)
 * - tax       = ภาษีรถยนต์ (จ่ายกับกรมการขนส่ง ไม่มีคู่สัญญา)
 */
export type DocType = 'insurance' | 'act' | 'tax';

export const DOC_TYPES: readonly DocType[] = ['insurance', 'act', 'tax'] as const;

/** ระดับสถานะเอกสาร เรียงจากแย่ไปดี ใช้ทั้งใน matrix, summary และการ์ดสรุป */
export type DocStatusLevel = 'expired' | 'warning' | 'ok' | 'none';

/** จำนวนวันก่อนหมดอายุที่ถือว่า "ใกล้หมดอายุ" (ระดับเร่งด่วน) */
export const WARNING_DAYS = 30;

/** SLA ระดับที่สอง — เตือนล่วงหน้า 2 เดือน (นับรวมช่วง <= 30 วันด้วย) */
export const SLA_SOON_DAYS = 60;

/**
 * จำนวนวันที่เหลือก่อนเอกสารหมดอายุ (ติดลบ = เกินกำหนดมาแล้ว)
 * เทียบแบบตัดเวลาออก เพื่อให้เอกสารที่หมดอายุ "วันนี้" ได้ 0 ไม่ใช่ -1 จากเศษชั่วโมง
 * @param expireDate วันหมดอายุของเอกสาร
 * @returns จำนวนวัน หรือ null ถ้าไม่มีเอกสาร
 */
export const daysUntil = (expireDate?: Date | string | null): number | null => {
  if (!expireDate) return null;
  return dayjs(expireDate).startOf('day').diff(dayjs().startOf('day'), 'day');
};

/**
 * แปลงวันหมดอายุเป็นระดับสถานะ — นิยาม "หมดอายุ" ที่เดียวของทั้งระบบ
 * สถานะไม่ได้เก็บลง DB แต่คำนวณสดทุกครั้ง จึงไม่มีทางค้างเป็น ACTIVE ทั้งที่เลยกำหนดแล้ว
 * @param expireDate วันหมดอายุของเอกสาร
 * @returns ระดับสถานะ: none = ไม่มีเอกสาร, expired = เกินกำหนด, warning = เหลือ <= 30 วัน, ok = ปกติ
 */
export const getDocLevel = (
  expireDate?: Date | string | null,
): DocStatusLevel => {
  const days = daysUntil(expireDate);
  if (days === null) return 'none';
  if (days < 0) return 'expired';
  if (days <= WARNING_DAYS) return 'warning';
  return 'ok';
};
