/** 1 รายการที่จะแสดงในอีเมล */
export interface NotificationMailItem {
  categoryLabel: string; //ประกันภัย / พ.ร.บ. / ภาษี / ตรวจสภาพรถ
  carName: string;
  detail: string; //ข้อความสรุป เช่น เลขกรมธรรม์ / รายละเอียดงาน
  dueLabel: string; //"หมดอายุใน 30 วัน" หรือ "เลยกำหนดมาแล้ว 5 วัน"
  isExpired: boolean;
}

/**
 * สร้าง HTML อีเมลสรุปการแจ้งเตือน (digest) ของผู้รับ 1 คน
 * @param recipientName ชื่อผู้รับ (สำหรับคำขึ้นต้น)
 * @param items รายการที่ถึงเกณฑ์แจ้งเตือนในรอบนี้
 * @returns HTML string
 */
export const templateNotification = (
  recipientName: string,
  items: NotificationMailItem[],
): string => {
  const rows = items
    .map((item) => {
      const color = item.isExpired ? '#cf1322' : '#d46b08';
      const bg = item.isExpired ? '#fff1f0' : '#fff7e6';
      return `
        <tr style="background:${bg};">
          <td style="padding:10px 12px;border:1px solid #f0f0f0;">${item.categoryLabel}</td>
          <td style="padding:10px 12px;border:1px solid #f0f0f0;">${item.carName}</td>
          <td style="padding:10px 12px;border:1px solid #f0f0f0;">${item.detail}</td>
          <td style="padding:10px 12px;border:1px solid #f0f0f0;color:${color};font-weight:600;">${item.dueLabel}</td>
        </tr>`;
    })
    .join('');

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#1f1f1f;max-width:720px;margin:0 auto;">
    <h2 style="color:#1677ff;margin-bottom:4px;">OSD Intranet — แจ้งเตือนกำหนดเอกสาร/ตรวจสภาพรถ</h2>
    <p style="margin-top:0;">เรียน คุณ${recipientName || ''}</p>
    <p>ระบบตรวจพบรายการที่ใกล้ถึงกำหนดหรือเลยกำหนด ดังนี้</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      <thead>
        <tr style="background:#fafafa;">
          <th style="padding:10px 12px;border:1px solid #f0f0f0;text-align:left;">ประเภท</th>
          <th style="padding:10px 12px;border:1px solid #f0f0f0;text-align:left;">รถ</th>
          <th style="padding:10px 12px;border:1px solid #f0f0f0;text-align:left;">รายละเอียด</th>
          <th style="padding:10px 12px;border:1px solid #f0f0f0;text-align:left;">สถานะ</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="color:#8c8c8c;font-size:12px;margin-top:16px;">
      อีเมลฉบับนี้ส่งอัตโนมัติจากระบบ OSD Intranet กรุณาอย่าตอบกลับ
    </p>
  </div>`;
};
