import * as dayjs from 'dayjs';

/**
 * ประเภทการแจ้งเตือนที่ระบบรองรับ — ตรงกับคอลัมน์ alertType ใน notificationSetting
 * และ type ในตาราง notification
 */
export const ALERT_TYPES = {
  INSURANCE: 'insurance-expiry',
  MA: 'ma-due',
} as const;

export type AlertType = (typeof ALERT_TYPES)[keyof typeof ALERT_TYPES];

/** ประเภทการแจ้งเตือนงานอนุมัติ (ลา/จองรถ/จองห้อง/OT) — always-on โดยดีฟอลต์ */
export const WORKFLOW_ALERT_TYPES = [
  'leave',
  'car-booking',
  'room-booking',
  'overtime',
] as const;

/** ค่าเริ่มต้นของ threshold (วันก่อนหมดอายุ) — 2 เดือน / 1 เดือน */
export const DEFAULT_THRESHOLDS = [60, 30];

/** เอกสารตามกฎหมายของรถ 3 ประเภท (สำหรับ label ในอีเมล/แจ้งเตือน) */
export const DOC_TYPE_LABEL: Record<string, string> = {
  insurance: 'ประกันภัย',
  act: 'พ.ร.บ.',
  tax: 'ภาษีรถยนต์',
};

/**
 * จำนวนวันที่เหลือก่อนถึงกำหนด (ติดลบ = เลยกำหนดมาแล้ว) เทียบแบบตัดเวลาออก
 * คัดลอกตรรกะจาก intranet ma-car-document.status.ts — service แยกกันจึง import ข้ามไม่ได้
 * @param date วันกำหนด (expireDate / dateEnd)
 * @returns จำนวนวัน หรือ null ถ้าไม่มีวันกำหนด
 */
export const daysUntil = (date?: Date | string | null): number | null => {
  if (!date) return null;
  return dayjs(date).startOf('day').diff(dayjs().startOf('day'), 'day');
};
