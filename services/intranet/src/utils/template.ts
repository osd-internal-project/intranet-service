import { readFileSync } from 'fs';
import { join } from 'path';
const logo = join(__dirname, '../../assets/osd_logo.png');
const footer = join(__dirname, '../../assets/footer.jpg');
import * as dayjs from 'dayjs';

export const templateDataLeave = async (data: any): Promise<string> => {
  const logoBase64 = readFileSync(logo).toString('base64');
  const logoSrc = `data:image/png;base64,${logoBase64}`;
  const footerBase64 = readFileSync(footer).toString('base64');
  const footerSrc = `data:image/png;base64,${footerBase64}`;
  return `
    <!DOCTYPE html>
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>ใบลาออนไลน์</title>
      </head>
      <body style="font-family: sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoSrc}" alt="Logo" style="height: 100px;" />
            <h2 style="color: #2c3e50;">ใบลาออนไลน์</h2>
          </div>
          <div style="text-align: right; color: #555;">วันที่ ${dayjs(
            data.startDate,
          ).format('DD-MM-YYYY')}</div>
          <div><strong>เรียน</strong> ${data.ownerName}</div>

          <div style="margin-top: 20px; color: #333;">
            <p><strong>นาย / นางสาว </strong>${data.firstName} ${
    data.lastName
  }</p>
          <p> <strong>จึงขอ</strong>${data.typeName}</p>  
          <p><strong>ขอแจ้งลางานเนื่องจาก</strong> ${data.detail}</p>
          <p><strong>ตั้งแต่วันที่ </strong> ${dayjs(data.startDate).format(
            'DD-MM-YYYY',
          )} เวลา  ${data.startTime}<strong>ถึงวันที่</strong> ${dayjs(
    data.endDate,
  ).format('DD-MM-YYYY')} เวลา  ${data.endTime}</p>
          <p><strong>สามารถติดต่อได้ที่เบอร์ </strong> ${data.phoneNumber}</p>
          </div>
          <div style="margin: 30px 0; text-align: center; color: #3498db; font-weight: bold;">
           จึงเรียนมาเพื่อขออนุมัติครับ
          </div>

          <div style="text-align: center; color: #555;">
              ขอบคุณครับ<br />
            ณ วันที่ <strong>${dayjs(new Date()).format(
              'DD-MM-YYYY',
            )}</strong> เวลา <strong>${dayjs(new Date()).format(
    'HH:mm',
  )}</strong>
          </div>
         <div style="margin-top: 30px; text-align: center;">
  <img src="${footerSrc}" alt="Footer" style="width: 100%; max-width: 600px; display: block; margin: 0 auto;" />
</div>
        </div>
      </body>
    </html>
  `;
};

export const templateDataLeaveApproved = async (
  data: any,
  type: string | null,
): Promise<string> => {
  const logoBase64 = readFileSync(logo).toString('base64');
  const logoSrc = `data:image/png;base64,${logoBase64}`;
  const footerBase64 = readFileSync(footer).toString('base64');
  const footerSrc = `data:image/png;base64,${footerBase64}`;
  return `
    <!DOCTYPE html>
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>ใบลาออนไลน์</title>
      </head>
      <body style="font-family: sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoSrc}" alt="Logo" style="height: 100px;" />
            <h2 style="color: #2c3e50;">ใบลาออนไลน์</h2>
          </div>
          <div style="text-align: right; color: #555;">วันที่ ${dayjs(
            data.startDate,
          ).format('DD-MM-YYYY')}</div>
          <div><strong>เรียน</strong> ${data.ownerName}</div>

          <div style="margin-top: 20px; color: #333;">
            <p><strong>นาย / นางสาว </strong>${data.firstName} ${
    data.lastName
  }</p>
          <p> <strong>จึงขอ</strong>${data.typeName}</p>  
          <p><strong>ขอแจ้งลางานเนื่องจาก</strong> ${data.detail}</p>
          <p><strong>ตั้งแต่วันที่ </strong> ${dayjs(data.startDate).format(
            'DD-MM-YYYY',
          )} เวลา  ${data.startTime}<strong>ถึงวันที่</strong> ${dayjs(
    data.endDate,
  ).format('DD-MM-YYYY')} เวลา  ${data.endTime}</p>
          <p><strong>สามารถติดต่อได้ที่เบอร์ </strong> ${data.phoneNumber}</p>
          </div>
          <div style="margin: 30px 0; text-align: center; color: #3498db; font-weight: bold;">
${type === 'approved' ? '' : 'ไม่'}อนุมัติ ${data.typeName}
          </div>

          <div style="text-align: center; color: #555;">
            ณ วันที่ <strong>${dayjs(new Date()).format(
              'DD-MM-YYYY',
            )}</strong> เวลา <strong>${dayjs(new Date()).format(
    'HH:mm',
  )}</strong>
          </div>
         <div style="margin-top: 30px; text-align: center;">
  <img src="${footerSrc}" alt="Footer" style="width: 100%; max-width: 600px; display: block; margin: 0 auto;" />
</div>
        </div>
      </body>
    </html>
  `;
};
