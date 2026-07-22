import { ModuleTypes } from '../enums/ModuleType.enum';

/**
 * กลยุทธ์การหาผู้รับของการแจ้งเตือนแต่ละประเภท
 * - REQUESTER  = เจ้าของงาน (ผู้สร้างคำขอ)
 * - APPROVER   = หัวหน้า/ผู้อนุมัติ (resolve ผ่าน getLeadUsersByUserId ด้วย moduleCode)
 * - FIXED_LIST = รายชื่อเจาะจงที่แอดมินกำหนด (notificationRecipient)
 */
export enum NotiTarget {
  REQUESTER = 'REQUESTER',
  APPROVER = 'APPROVER',
  FIXED_LIST = 'FIXED_LIST',
}

/** นิยาม 1 ประเภทการแจ้งเตือนใน catalog (แหล่งความจริงเดียวของทั้งระบบ) */
export interface NotiTypeDef {
  key: string; //ตรงกับคอลัมน์ type ในตาราง notification และ alertType ใน notificationSetting
  label: string; //ชื่อแสดงในหน้าตั้งค่า
  category: string; //ใช้จัดกลุ่มในหน้าตั้งค่า
  defaultTarget: NotiTarget;
  moduleCode?: string; //ใช้ตอน target = APPROVER
  hasThresholds?: boolean; //ประเภทหมดอายุเท่านั้น
}

/**
 * แคตตาล็อกประเภทการแจ้งเตือนทั้งหมด — เพิ่ม/แก้ประเภทที่นี่ที่เดียว
 * ค่า default = พฤติกรรมปัจจุบัน (backward compatible)
 */
export const NOTIFICATION_CATALOG: NotiTypeDef[] = [
  // เอกสารรถ / ตรวจสภาพ — ส่งหารายชื่อเจาะจง
  {
    key: 'insurance-expiry',
    label: 'เอกสารรถ (ประกัน / พ.ร.บ. / ภาษี)',
    category: 'เอกสารรถ',
    defaultTarget: NotiTarget.FIXED_LIST,
    hasThresholds: true,
  },
  {
    key: 'ma-due',
    label: 'ตรวจสภาพรถ',
    category: 'เอกสารรถ',
    defaultTarget: NotiTarget.FIXED_LIST,
    hasThresholds: true,
  },

  // ลางาน
  {
    key: 'leave-request',
    label: 'ลางาน — แจ้งผู้อนุมัติ',
    category: 'ลางาน',
    defaultTarget: NotiTarget.APPROVER,
    moduleCode: ModuleTypes.INTRANET_APPROVE_LEAVE,
  },
  {
    key: 'leave-result',
    label: 'ลางาน — แจ้งผลถึงผู้ขอ',
    category: 'ลางาน',
    defaultTarget: NotiTarget.REQUESTER,
  },

  // จองรถ
  {
    key: 'car-request',
    label: 'จองรถ — แจ้งผู้อนุมัติ',
    category: 'จองรถ',
    defaultTarget: NotiTarget.APPROVER,
    moduleCode: ModuleTypes.INTRANET_APPROVE_BOOKING_CAR,
  },
  {
    key: 'car-return',
    label: 'จองรถ — แจ้งรับคืนถึงผู้อนุมัติ',
    category: 'จองรถ',
    defaultTarget: NotiTarget.APPROVER,
    moduleCode: ModuleTypes.INTRANET_APPROVE_BOOKING_CAR,
  },
  {
    key: 'car-result',
    label: 'จองรถ — แจ้งผลถึงผู้ขอ',
    category: 'จองรถ',
    defaultTarget: NotiTarget.REQUESTER,
  },

  // จองห้องประชุม
  {
    key: 'room-request',
    label: 'จองห้องประชุม — แจ้งผู้อนุมัติ',
    category: 'จองห้องประชุม',
    defaultTarget: NotiTarget.APPROVER,
    moduleCode: ModuleTypes.INTRANET_APPROVE_BOOKING_ROOM,
  },
  {
    key: 'room-result',
    label: 'จองห้องประชุม — แจ้งผลถึงผู้ขอ',
    category: 'จองห้องประชุม',
    defaultTarget: NotiTarget.REQUESTER,
  },

  // ทำงานล่วงเวลา (OT)
  {
    key: 'ot-request',
    label: 'OT — แจ้งผู้อนุมัติ',
    category: 'ทำงานล่วงเวลา (OT)',
    defaultTarget: NotiTarget.APPROVER,
    moduleCode: ModuleTypes.INTRANET_APPROVE_LEAVE,
  },
  {
    key: 'ot-result',
    label: 'OT — แจ้งผลถึงผู้ขอ',
    category: 'ทำงานล่วงเวลา (OT)',
    defaultTarget: NotiTarget.REQUESTER,
  },
];

/** ค้นหา def จาก key ได้เร็ว */
export const catalogByKey = new Map<string, NotiTypeDef>(
  NOTIFICATION_CATALOG.map((d) => [d.key, d]),
);
