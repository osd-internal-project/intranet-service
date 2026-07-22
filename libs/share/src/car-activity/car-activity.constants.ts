/**
 * แคตตาล็อก action ของกิจกรรมรถ — prefix (ก่อนจุด) = type/หมวด
 * ใช้เป็นค่า action ในตาราง car_activity_log และ label ไทยสำหรับ description
 */
export const CarActivityAction = {
  CAR_CREATE: 'car.create',
  CAR_UPDATE: 'car.update',
  CAR_DELETE: 'car.delete',

  BOOKING_CREATE: 'booking.create',
  BOOKING_APPROVE: 'booking.approve',
  BOOKING_REJECT: 'booking.reject',
  BOOKING_COMPLETE: 'booking.complete',
  BOOKING_CANCEL: 'booking.cancel',
  BOOKING_RETURN: 'booking.return',
  BOOKING_DELETE: 'booking.delete',

  WRAPUP_CREATE: 'wrapup.create',
  WRAPUP_UPDATE: 'wrapup.update',
  WRAPUP_DELETE: 'wrapup.delete',

  DOCUMENT_CREATE: 'document.create',
  DOCUMENT_UPDATE: 'document.update',
  DOCUMENT_VOID: 'document.void',
  DOCUMENT_FILE_UPLOAD: 'document.file-upload',
  DOCUMENT_FILE_DELETE: 'document.file-delete',

  FUEL_USE: 'fuel.use',
  FUEL_RESET: 'fuel.reset',
  FUEL_ADJUST: 'fuel.adjust',

  FILE_CAR_UPLOAD: 'file.car-upload',
  FILE_CAR_DELETE: 'file.car-delete',
  FILE_BOOKING_UPLOAD: 'file.booking-upload',
  FILE_BOOKING_DELETE: 'file.booking-delete',
  FILE_WRAPUP_UPLOAD: 'file.wrapup-upload',
  FILE_WRAPUP_DELETE: 'file.wrapup-delete',
} as const;

/** ป้ายภาษาไทยของแต่ละ action (สำหรับ description เริ่มต้น / แสดงผล) */
export const ACTION_LABEL: Record<string, string> = {
  'car.create': 'เพิ่มรถ',
  'car.update': 'แก้ไขข้อมูลรถ',
  'car.delete': 'ลบรถ',

  'booking.create': 'สร้างการจองรถ',
  'booking.approve': 'อนุมัติการจอง',
  'booking.reject': 'ปฏิเสธการจอง',
  'booking.complete': 'รับคืนรถ (จบการจอง)',
  'booking.cancel': 'ยกเลิกการจอง',
  'booking.return': 'แจ้งคืนรถ',
  'booking.delete': 'ลบการจอง',

  'wrapup.create': 'เพิ่มการตรวจสภาพ',
  'wrapup.update': 'แก้ไขการตรวจสภาพ',
  'wrapup.delete': 'ลบการตรวจสภาพ',

  'document.create': 'เพิ่ม/ต่ออายุเอกสาร',
  'document.update': 'แก้ไขเอกสาร',
  'document.void': 'ยกเลิกเอกสาร',
  'document.file-upload': 'อัปโหลดไฟล์เอกสาร',
  'document.file-delete': 'ลบไฟล์เอกสาร',

  'fuel.use': 'ตัดน้ำมัน (ใช้งาน)',
  'fuel.reset': 'รีเซ็ตวงเงินน้ำมัน',
  'fuel.adjust': 'ปรับวงเงินน้ำมัน',

  'file.car-upload': 'อัปโหลดไฟล์รถ',
  'file.car-delete': 'ลบไฟล์รถ',
  'file.booking-upload': 'อัปโหลดรูปการจอง',
  'file.booking-delete': 'ลบรูปการจอง',
  'file.wrapup-upload': 'อัปโหลดรูปตรวจสภาพ',
  'file.wrapup-delete': 'ลบรูปตรวจสภาพ',
};
