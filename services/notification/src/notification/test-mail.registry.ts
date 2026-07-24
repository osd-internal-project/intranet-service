import {
  templateNotification,
  NotificationMailItem,
} from '../utils/template-notification';

/** ชนิดของช่องกรอกข้อมูลในฟอร์มทดสอบส่งอีเมล */
export type TestFieldType = 'text' | 'textarea' | 'datetime' | 'boolean' | 'select';

/** นิยาม 1 ช่องกรอกของ template (ให้ frontend เอาไป render ฟอร์มแบบไดนามิก) */
export interface TestTemplateField {
  name: string; //คีย์ใน object `data`
  label: string; //ป้ายกำกับที่แสดงบนฟอร์ม
  type: TestFieldType;
  options?: { label: string; value: string }[]; //ใช้เมื่อ type = 'select'
  sample?: unknown; //ค่าเริ่มต้นที่ prefill ให้
  required?: boolean;
}

/** ค่าที่ส่งกลับให้ frontend (เฉพาะ metadata ไม่รวมฟังก์ชัน build) */
export interface TestTemplateMeta {
  key: string;
  label: string;
  subject: string;
  fields: TestTemplateField[];
}

/** 1 รายการใน registry = metadata + วิธี build HTML จากข้อมูลที่กรอก */
export interface TestTemplateEntry extends TestTemplateMeta {
  build: (data: Record<string, unknown>) => Promise<string> | string;
}

/**
 * แคตตาล็อก template อีเมลที่ทดสอบได้จาก service นี้
 * ปัจจุบันมี digest แจ้งเตือนเอกสาร/ตรวจสภาพรถ เพียงตัวเดียว
 */
export const NOTIFICATION_TEST_TEMPLATES: TestTemplateEntry[] = [
  {
    key: 'notification-digest',
    label: 'แจ้งเตือนเอกสาร/ตรวจสภาพรถ (digest)',
    subject: 'OSD Intranet แจ้งเตือนกำหนดเอกสาร/ตรวจสภาพรถ',
    fields: [
      { name: 'recipientName', label: 'ชื่อผู้รับ', type: 'text', sample: 'ทดสอบ ระบบ', required: true },
      {
        name: 'categoryLabel',
        label: 'ประเภทเอกสาร',
        type: 'select',
        options: [
          { label: 'ประกันภัย', value: 'ประกันภัย' },
          { label: 'พ.ร.บ.', value: 'พ.ร.บ.' },
          { label: 'ภาษีรถยนต์', value: 'ภาษีรถยนต์' },
          { label: 'ตรวจสภาพรถ', value: 'ตรวจสภาพรถ' },
        ],
        sample: 'ประกันภัย',
      },
      { name: 'carName', label: 'ชื่อ/ทะเบียนรถ', type: 'text', sample: 'กข-1234', required: true },
      { name: 'detail', label: 'รายละเอียด', type: 'text', sample: 'บริษัทประกัน • เลขกรมธรรม์ 000-111' },
      { name: 'dueLabel', label: 'สถานะกำหนด', type: 'text', sample: 'ใกล้ถึงกำหนดในอีก 30 วัน' },
      { name: 'isExpired', label: 'เลยกำหนดแล้ว (แสดงสีแดง)', type: 'boolean', sample: false },
    ],
    build: (data) => {
      const item: NotificationMailItem = {
        categoryLabel: String(data.categoryLabel ?? ''),
        carName: String(data.carName ?? ''),
        detail: String(data.detail ?? ''),
        dueLabel: String(data.dueLabel ?? ''),
        isExpired: Boolean(data.isExpired),
      };
      return templateNotification(String(data.recipientName ?? ''), [item]);
    },
  },
];

/** map metadata (ตัดฟังก์ชัน build ออก) สำหรับส่งให้ frontend */
export const toTemplateMeta = (
  entries: TestTemplateEntry[],
): TestTemplateMeta[] =>
  entries.map(({ key, label, subject, fields }) => ({
    key,
    label,
    subject,
    fields,
  }));
