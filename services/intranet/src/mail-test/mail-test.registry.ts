import {
  templateDataLeave,
  templateDataLeaveApproved,
} from '../utils/template-booking-leave';
import {
  templateCarBooikng,
  templateCarBooikngReturn,
  templateCarBooikngApproved,
} from '../utils/template-booking-car';
import {
  templateBookingRoom,
  templateBookingRoomApproved,
} from '../utils/template-booking-room';
import {
  templateOverTime,
  templateOverTimeApproved,
} from '../utils/template-booking-overtime';
import { Prisma } from '@prisma/client';

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

/** metadata ที่ส่งกลับให้ frontend (ไม่รวมฟังก์ชัน build) */
export interface TestTemplateMeta {
  key: string;
  label: string;
  subject: string;
  fields: TestTemplateField[];
}

/** 1 รายการใน registry = metadata + วิธี build HTML จากข้อมูลที่กรอก */
export interface TestTemplateEntry extends TestTemplateMeta {
  build: (data: Record<string, unknown>) => Promise<string>;
}

/** อ่านค่า string จาก data แบบปลอดภัย */
const str = (v: unknown): string => (v == null ? '' : String(v));

/** ห่อชื่อผู้รับ 1 คนให้เป็น array ตามรูปแบบที่ template ต้องการ ("เรียน คุณ...") */
const wrapRecipient = (name: string) => [{ firstNameTh: name, lastNameTh: '' }];

/**
 * สร้าง object ข้อมูล OT จากฟอร์ม
 * template รับ Prisma.overtimeCreateInput แต่ใช้จริงเพียงไม่กี่ field —
 * cast ผ่าน unknown เพราะเป็นแค่ข้อมูลทดสอบ ไม่ได้บันทึกลง DB
 */
const otData = (d: Record<string, unknown>): Prisma.overtimeCreateInput =>
  ({
    fullname: str(d.fullname),
    partTimeType: str(d.partTimeType),
    detailWork: str(d.detailWork),
    dateStart: d.dateStart,
    startTime: str(d.startTime),
    endTime: str(d.endTime),
    phoneNumber: str(d.phoneNumber),
  }) as unknown as Prisma.overtimeCreateInput;

/**
 * แคตตาล็อก template อีเมลงานอนุมัติที่ทดสอบส่งได้จาก service นี้ (intranet)
 * แต่ละรายการแปลงข้อมูล flat จากฟอร์ม → รูปแบบ argument ที่ template function ต้องการ
 */
export const INTRANET_TEST_TEMPLATES: TestTemplateEntry[] = [
  // ---------- ลางาน ----------
  {
    key: 'leave-request',
    label: 'ลางาน — แจ้งผู้อนุมัติ',
    subject: 'OSD Intranet ใบลาออนไลน์',
    fields: [
      { name: 'ownerName', label: 'เรียน (หัวหน้า/ผู้อนุมัติ)', type: 'text', sample: 'คุณหัวหน้า ใจดี', required: true },
      { name: 'firstName', label: 'ชื่อผู้ขอลา', type: 'text', sample: 'สมชาย', required: true },
      { name: 'lastName', label: 'นามสกุลผู้ขอลา', type: 'text', sample: 'ใจดี' },
      { name: 'typeName', label: 'ประเภทการลา', type: 'text', sample: 'ลาป่วย' },
      { name: 'detail', label: 'เหตุผล', type: 'textarea', sample: 'มีอาการไข้ ต้องพักรักษาตัว' },
      { name: 'startDate', label: 'วันที่เริ่ม', type: 'datetime', sample: '2026-08-01T09:00:00' },
      { name: 'startTime', label: 'เวลาเริ่ม (เช่น 09:00)', type: 'text', sample: '09:00' },
      { name: 'endDate', label: 'วันที่สิ้นสุด', type: 'datetime', sample: '2026-08-02T17:00:00' },
      { name: 'endTime', label: 'เวลาสิ้นสุด (เช่น 17:00)', type: 'text', sample: '17:00' },
      { name: 'phoneNumber', label: 'เบอร์ติดต่อ', type: 'text', sample: '081-234-5678' },
    ],
    build: (d) => templateDataLeave(d),
  },
  {
    key: 'leave-result',
    label: 'ลางาน — แจ้งผลถึงผู้ขอ',
    subject: 'OSD Intranet ใบลาออนไลน์',
    fields: [
      { name: 'recipientFirstName', label: 'ชื่อผู้รับ (ผู้ขอลา)', type: 'text', sample: 'สมชาย', required: true },
      { name: 'recipientLastName', label: 'นามสกุลผู้รับ', type: 'text', sample: 'ใจดี' },
      {
        name: 'type',
        label: 'ผลอนุมัติ',
        type: 'select',
        options: [
          { label: 'อนุมัติ', value: 'approved' },
          { label: 'ไม่อนุมัติ', value: 'reject' },
        ],
        sample: 'approved',
      },
      { name: 'typeLeave', label: 'ประเภทการลา', type: 'text', sample: 'ลาป่วย' },
      { name: 'empFirstName', label: 'ชื่อพนักงาน', type: 'text', sample: 'สมชาย' },
      { name: 'empLastName', label: 'นามสกุลพนักงาน', type: 'text', sample: 'ใจดี' },
      { name: 'position', label: 'ตำแหน่ง', type: 'text', sample: 'เจ้าหน้าที่' },
      { name: 'phoneNumber', label: 'เบอร์ติดต่อ', type: 'text', sample: '081-234-5678' },
      { name: 'detail', label: 'เหตุผลการลา', type: 'textarea', sample: 'มีอาการไข้ ต้องพักรักษาตัว' },
      { name: 'startDate', label: 'วันที่เริ่ม', type: 'datetime', sample: '2026-08-01T09:00:00' },
      { name: 'startTime', label: 'เวลาเริ่ม', type: 'text', sample: '09:00' },
      { name: 'endDate', label: 'วันที่สิ้นสุด', type: 'datetime', sample: '2026-08-02T17:00:00' },
      { name: 'endTime', label: 'เวลาสิ้นสุด', type: 'text', sample: '17:00' },
      { name: 'leaveHour', label: 'จำนวนชั่วโมง', type: 'text', sample: '16' },
      { name: 'detailApproved', label: 'เหตุผลที่ไม่อนุมัติ (ถ้ามี)', type: 'textarea', sample: '' },
      { name: 'userApproved', label: 'ผู้อนุมัติ', type: 'text', sample: 'คุณหัวหน้า ใจดี' },
      { name: 'approvedDate', label: 'วันเวลาที่อนุมัติ', type: 'datetime', sample: '2026-08-01T10:00:00' },
    ],
    build: (d) =>
      templateDataLeaveApproved(
        { firstNameTh: str(d.recipientFirstName), lastNameTh: str(d.recipientLastName) },
        str(d.type),
        {
          typeLeave: str(d.typeLeave),
          detailApproved: str(d.detailApproved),
          userApproved: str(d.userApproved),
          approvedDate: d.approvedDate,
        },
        {
          firstName: str(d.empFirstName),
          lastName: str(d.empLastName),
          position: str(d.position),
          phoneNumber: str(d.phoneNumber),
          detail: str(d.detail),
          startDate: d.startDate,
          startTime: str(d.startTime),
          endDate: d.endDate,
          endTime: str(d.endTime),
          leaveHour: str(d.leaveHour),
        },
      ),
  },

  // ---------- จองรถ ----------
  {
    key: 'car-request',
    label: 'จองรถ — แจ้งผู้อนุมัติ',
    subject: 'OSD Intranet จองรถยนต์ออนไลน์',
    fields: [
      { name: 'recipientName', label: 'เรียน (ผู้อนุมัติ)', type: 'text', sample: 'คุณหัวหน้า ใจดี', required: true },
      { name: 'bookerFirstName', label: 'ชื่อผู้จอง', type: 'text', sample: 'สมชาย', required: true },
      { name: 'bookerLastName', label: 'นามสกุลผู้จอง', type: 'text', sample: 'ใจดี' },
      { name: 'bookerPhone', label: 'เบอร์ผู้จอง', type: 'text', sample: '081-234-5678' },
      { name: 'carName', label: 'รถ/ทะเบียน', type: 'text', sample: 'Toyota กข-1234' },
      { name: 'carBookTitle', label: 'เหตุผลการจอง', type: 'text', sample: 'เดินทางไปประชุมลูกค้า' },
      { name: 'carBookPlace', label: 'สถานที่จอด', type: 'text', sample: 'สำนักงานใหญ่' },
      { name: 'carBookStartDate', label: 'วันเวลาเริ่ม', type: 'datetime', sample: '2026-08-01T09:00:00' },
      { name: 'carBookEndDate', label: 'วันเวลาสิ้นสุด', type: 'datetime', sample: '2026-08-01T17:00:00' },
    ],
    build: (d) =>
      templateCarBooikng(
        {
          carName: str(d.carName),
          carBookTitle: str(d.carBookTitle),
          carBookPlace: str(d.carBookPlace),
          carBookStartDate: d.carBookStartDate,
          carBookEndDate: d.carBookEndDate,
        },
        wrapRecipient(str(d.recipientName)),
        {
          firstNameTh: str(d.bookerFirstName),
          lastNameTh: str(d.bookerLastName),
          phoneNumber: str(d.bookerPhone),
        },
      ),
  },
  {
    key: 'car-return',
    label: 'จองรถ — แจ้งรับคืนถึงผู้อนุมัติ',
    subject: 'OSD Intranet จองรถยนต์ออนไลน์',
    fields: [
      { name: 'recipientName', label: 'เรียน (ผู้อนุมัติ)', type: 'text', sample: 'คุณหัวหน้า ใจดี', required: true },
      { name: 'bookerFirstName', label: 'ชื่อผู้จอง', type: 'text', sample: 'สมชาย', required: true },
      { name: 'bookerLastName', label: 'นามสกุลผู้จอง', type: 'text', sample: 'ใจดี' },
      { name: 'bookerPhone', label: 'เบอร์ผู้จอง', type: 'text', sample: '081-234-5678' },
      { name: 'carName', label: 'รถ/ทะเบียน', type: 'text', sample: 'Toyota กข-1234' },
      { name: 'carBookTitle', label: 'เหตุผลการจอง', type: 'text', sample: 'เดินทางไปประชุมลูกค้า' },
      { name: 'carBookPlace', label: 'สถานที่จอด', type: 'text', sample: 'สำนักงานใหญ่' },
      { name: 'carBookStartDate', label: 'วันเวลาเริ่ม', type: 'datetime', sample: '2026-08-01T09:00:00' },
      { name: 'carBookEndDate', label: 'วันเวลาสิ้นสุด', type: 'datetime', sample: '2026-08-01T17:00:00' },
    ],
    build: (d) =>
      templateCarBooikngReturn(
        {
          carName: str(d.carName),
          carBookTitle: str(d.carBookTitle),
          carBookPlace: str(d.carBookPlace),
          carBookStartDate: d.carBookStartDate,
          carBookEndDate: d.carBookEndDate,
        },
        wrapRecipient(str(d.recipientName)),
        {
          firstNameTh: str(d.bookerFirstName),
          lastNameTh: str(d.bookerLastName),
          phoneNumber: str(d.bookerPhone),
        },
        '',
      ),
  },
  {
    key: 'car-result',
    label: 'จองรถ — แจ้งผลถึงผู้ขอ',
    subject: 'OSD Intranet จองรถยนต์ออนไลน์',
    fields: [
      { name: 'recipientName', label: 'เรียน (ผู้ขอ)', type: 'text', sample: 'สมชาย ใจดี', required: true },
      { name: 'bookerFirstName', label: 'ชื่อผู้จอง', type: 'text', sample: 'สมชาย', required: true },
      { name: 'bookerLastName', label: 'นามสกุลผู้จอง', type: 'text', sample: 'ใจดี' },
      { name: 'bookerPhone', label: 'เบอร์ผู้จอง', type: 'text', sample: '081-234-5678' },
      { name: 'carName', label: 'รถ/ทะเบียน', type: 'text', sample: 'Toyota กข-1234' },
      { name: 'carBookTitle', label: 'เหตุผลการจอง', type: 'text', sample: 'เดินทางไปประชุมลูกค้า' },
      { name: 'carBookPlace', label: 'สถานที่จอด', type: 'text', sample: 'สำนักงานใหญ่' },
      { name: 'carBookStartDate', label: 'วันเวลาเริ่ม', type: 'datetime', sample: '2026-08-01T09:00:00' },
      { name: 'carBookEndDate', label: 'วันเวลาสิ้นสุด', type: 'datetime', sample: '2026-08-01T17:00:00' },
      {
        name: 'status',
        label: 'สถานะ',
        type: 'select',
        options: [
          { label: 'อนุมัติ', value: 'Approve' },
          { label: 'รับคืนแล้ว', value: 'Completed' },
        ],
        sample: 'Approve',
      },
    ],
    build: (d) =>
      templateCarBooikngApproved(
        {
          carName: str(d.carName),
          carBookTitle: str(d.carBookTitle),
          carBookPlace: str(d.carBookPlace),
          carBookStartDate: d.carBookStartDate,
          carBookEndDate: d.carBookEndDate,
        },
        wrapRecipient(str(d.recipientName)),
        {
          firstNameTh: str(d.bookerFirstName),
          lastNameTh: str(d.bookerLastName),
          phoneNumber: str(d.bookerPhone),
        },
        str(d.status),
      ),
  },

  // ---------- จองห้องประชุม ----------
  {
    key: 'room-request',
    label: 'จองห้องประชุม — แจ้งผู้อนุมัติ',
    subject: 'OSD Intranet จองห้องประชุมออนไลน์',
    fields: [
      { name: 'recipientName', label: 'เรียน (ผู้อนุมัติ)', type: 'text', sample: 'คุณหัวหน้า ใจดี', required: true },
      { name: 'bookerName', label: 'ชื่อผู้จอง', type: 'text', sample: 'สมชาย ใจดี', required: true },
      { name: 'roomName', label: 'ห้องประชุม', type: 'text', sample: 'ห้องประชุม A' },
      { name: 'title', label: 'เรื่องที่ประชุม', type: 'text', sample: 'ประชุมทีมประจำเดือน' },
      { name: 'startDate', label: 'วันเวลาเริ่ม', type: 'datetime', sample: '2026-08-01T09:00:00' },
      { name: 'endDate', label: 'วันเวลาสิ้นสุด', type: 'datetime', sample: '2026-08-01T11:00:00' },
      { name: 'bookerPhone', label: 'เบอร์ผู้จอง', type: 'text', sample: '081-234-5678' },
    ],
    build: (d) =>
      templateBookingRoom(
        {
          bookerName: str(d.bookerName),
          roomName: str(d.roomName),
          title: str(d.title),
          startDate: d.startDate,
          endDate: d.endDate,
          bookerPhone: str(d.bookerPhone),
        },
        wrapRecipient(str(d.recipientName)),
      ),
  },
  {
    key: 'room-result',
    label: 'จองห้องประชุม — แจ้งผลถึงผู้ขอ',
    subject: 'OSD Intranet จองห้องประชุมออนไลน์',
    fields: [
      { name: 'recipientName', label: 'เรียน (ผู้ขอ)', type: 'text', sample: 'สมชาย ใจดี', required: true },
      { name: 'bookerName', label: 'ชื่อผู้จอง', type: 'text', sample: 'สมชาย ใจดี', required: true },
      { name: 'roomName', label: 'ห้องประชุม', type: 'text', sample: 'ห้องประชุม A' },
      { name: 'title', label: 'เรื่องที่ประชุม', type: 'text', sample: 'ประชุมทีมประจำเดือน' },
      { name: 'startDate', label: 'วันเวลาเริ่ม', type: 'datetime', sample: '2026-08-01T09:00:00' },
      { name: 'endDate', label: 'วันเวลาสิ้นสุด', type: 'datetime', sample: '2026-08-01T11:00:00' },
      { name: 'bookerPhone', label: 'เบอร์ผู้จอง', type: 'text', sample: '081-234-5678' },
      {
        name: 'status',
        label: 'ผลอนุมัติ',
        type: 'select',
        options: [
          { label: 'อนุมัติ', value: 'Approve' },
          { label: 'ไม่อนุมัติ', value: 'reject' },
        ],
        sample: 'Approve',
      },
    ],
    build: (d) =>
      templateBookingRoomApproved(
        wrapRecipient(str(d.recipientName)),
        {
          bookerName: str(d.bookerName),
          roomName: str(d.roomName),
          title: str(d.title),
          startDate: d.startDate,
          endDate: d.endDate,
          bookerPhone: str(d.bookerPhone),
        },
        str(d.status),
      ),
  },

  // ---------- ทำงานล่วงเวลา (OT) ----------
  {
    key: 'ot-request',
    label: 'OT — แจ้งผู้อนุมัติ',
    subject: 'OSD Intranet เบิกทำงานล่วงเวลา',
    fields: [
      { name: 'recipientName', label: 'เรียน (ผู้อนุมัติ)', type: 'text', sample: 'คุณหัวหน้า ใจดี', required: true },
      { name: 'fullname', label: 'ชื่อผู้ขอ', type: 'text', sample: 'สมชาย ใจดี', required: true },
      {
        name: 'partTimeType',
        label: 'ประเภท',
        type: 'select',
        options: [
          { label: 'ทำงานล่วงเวลา', value: 'working' },
          { label: 'ขับรถ', value: 'driving' },
        ],
        sample: 'working',
      },
      { name: 'detailWork', label: 'รายละเอียดงาน', type: 'textarea', sample: 'จัดเตรียมเอกสารปิดงบประจำเดือน' },
      { name: 'dateStart', label: 'วันที่', type: 'datetime', sample: '2026-08-01T18:00:00' },
      { name: 'startTime', label: 'เวลาเริ่ม', type: 'text', sample: '18:00' },
      { name: 'endTime', label: 'เวลาสิ้นสุด', type: 'text', sample: '21:00' },
      { name: 'phoneNumber', label: 'เบอร์ติดต่อ', type: 'text', sample: '081-234-5678' },
    ],
    build: (d) => templateOverTime(wrapRecipient(str(d.recipientName)), otData(d), {}, ''),
  },
  {
    key: 'ot-result',
    label: 'OT — แจ้งผลถึงผู้ขอ',
    subject: 'OSD Intranet เบิกทำงานล่วงเวลา',
    fields: [
      { name: 'recipientName', label: 'เรียน (ผู้ขอ)', type: 'text', sample: 'สมชาย ใจดี', required: true },
      { name: 'fullname', label: 'ชื่อผู้ขอ', type: 'text', sample: 'สมชาย ใจดี', required: true },
      {
        name: 'partTimeType',
        label: 'ประเภท',
        type: 'select',
        options: [
          { label: 'ทำงานล่วงเวลา', value: 'working' },
          { label: 'ขับรถ', value: 'driving' },
        ],
        sample: 'working',
      },
      { name: 'detailWork', label: 'รายละเอียดงาน', type: 'textarea', sample: 'จัดเตรียมเอกสารปิดงบประจำเดือน' },
      { name: 'dateStart', label: 'วันที่', type: 'datetime', sample: '2026-08-01T18:00:00' },
      { name: 'startTime', label: 'เวลาเริ่ม', type: 'text', sample: '18:00' },
      { name: 'endTime', label: 'เวลาสิ้นสุด', type: 'text', sample: '21:00' },
      { name: 'phoneNumber', label: 'เบอร์ติดต่อ', type: 'text', sample: '081-234-5678' },
      {
        name: 'status',
        label: 'ผลอนุมัติ',
        type: 'select',
        options: [
          { label: 'อนุมัติ', value: 'approved' },
          { label: 'ไม่อนุมัติ', value: 'reject' },
        ],
        sample: 'approved',
      },
    ],
    build: (d) =>
      templateOverTimeApproved(
        otData(d),
        wrapRecipient(str(d.recipientName)),
        {},
        str(d.status),
      ),
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
