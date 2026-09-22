/**
 * จัดรูปวันที่เป็น DD/MM/YYYY แบบไม่พึ่ง lib (กัน ICU/timezone บนบาง runtime)
 * @param value ค่าวันที่ (Date/string/number) — คืน '' ถ้าไม่ถูกต้อง
 */
export const fmtThaiDate = (value?: Date | string | number | null): string => {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
};

/**
 * แปลงสถานะอนุมัติ (approve/reject) เป็นข้อความไทยต่อท้ายหัวข้อแจ้งเตือน
 * ใช้ร่วมกับ flow ลา/จองห้อง/OT (จองรถมี label เฉพาะของตัวเอง)
 */
export const approvalLabel = (status: string): string => {
  const s = (status || '').toLowerCase();
  if (s.includes('approve')) return 'ได้รับการอนุมัติ';
  if (s.includes('reject') || s.includes('disap') || s.includes('not'))
    return 'ถูกปฏิเสธ';
  if (s.includes('cancel')) return 'ถูกยกเลิก';
  return `: ${status}`;
};
