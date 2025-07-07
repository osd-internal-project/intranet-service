import { readFileSync } from 'fs';
import { join } from 'path';
const logo = join(__dirname, '../../assets/osd_logo.png');
const footer = join(__dirname, '../../assets/footer.jpg');
import * as dayjs from 'dayjs';
import { Prisma } from '@prisma/client';
const logoBase64 = readFileSync(logo).toString('base64');
const logoSrc = `data:image/png;base64,${logoBase64}`;
const footerBase64 = readFileSync(footer).toString('base64');
const footerSrc = `data:image/png;base64,${footerBase64}`;
export const templateOverTime = async (
  data: Prisma.overtimeCreateInput,
  recipients: Prisma.usersWhereInput[],
  findUsers: Prisma.usersWhereInput,
  status: string,
): Promise<string> => {
  return `
    <!DOCTYPE html>
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>ใบเบิกทำงานล่วงเวลาออนไลน์</title>
      </head>
      <body style="font-family: sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoSrc}" alt="Logo" style="height: 100px;" />
            <h2 style="color: #2c3e50;">ใบเบิกทำงานล่วงเวลาออนไลน์</h2>
          </div>
          <div style="text-align: right; color: #555;">วันที่ ${dayjs()
            .add(7, 'hour')
            .format('DD-MM-YYYY')}</div>
          <div><strong>เรียน</strong> ${recipients
            .map((user: any) => `คุณ ${user.firstNameTh} ${user.lastNameTh}`)
            .join(' , ')}</div>
          <div style="margin-top: 20px; color: #333;">
          <p><strong>คุณ </strong>${data.fullname}</p>
          <p> <strong>จึงขอ</strong>${data.partTimeType}</p>  
          <p><strong>ขอแจ้งลางานเนื่องจาก</strong> ${data.detailWork}</p>
          <p><strong>วันที่ </strong> ${dayjs(data.dateStart)
            .add(7, 'hour')
            .format('DD-MM-YYYY')} เวลา  ${
    data.startTime ? data.startTime : ''
  }<strong>ถึงเวลา  ${data.endTime ? data.endTime : ''}</p>
          <p><strong>สามารถติดต่อได้ที่เบอร์ </strong> ${data.phoneNumber}</p>
          </div>
          <div style="margin: 30px 0; text-align: center; color: #3498db; font-weight: bold;">
           จึงเรียนมาเพื่อขออนุมัติครับ
          </div>

          <div style="text-align: center; color: #555;">
              ขอบคุณครับ<br />
            ณ วันที่ <strong>${dayjs(new Date())
              .add(7, 'hour')
              .format('DD-MM-YYYY')}</strong> เวลา <strong>${dayjs(new Date())
    .add(7, 'hour')
    .format('HH:mm')}</strong>
          </div>
         <div style="margin-top: 30px; text-align: center;">
  <img src="${footerSrc}" alt="Footer" style="width: 100%; max-width: 600px; display: block; margin: 0 auto;" />
</div>
        </div>
      </body>
    </html>
  `;
};

export const templateOverTimeApproved = async (
  data: Prisma.overtimeCreateInput,
  recipients: Prisma.usersWhereInput[],
  findUsers: Prisma.usersWhereInput,
  status: string,
): Promise<string> => {
  return `
    <!DOCTYPE html>
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>ใบเบิกทำงานล่วงเวลาออนไลน์</title>
      </head>
      <body style="font-family: sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoSrc}" alt="Logo" style="height: 100px;" />
            <h2 style="color: #2c3e50;">ใบเบิกทำงานล่วงเวลาออนไลน์</h2>
          </div>
          <div style="text-align: right; color: #555;">วันที่ ${dayjs()
            .add(7, 'hour')
            .format('DD-MM-YYYY')}</div>
          <div><strong>เรียน</strong> ${recipients
            .map((user: any) => `คุณ ${user.firstNameTh} ${user.lastNameTh}`)
            .join(' , ')}</div>
          <div style="margin-top: 20px; color: #333;">
          <p><strong>คุณ </strong>${data.fullname}</p>
          <p> <strong>จึงขอ</strong>${data.partTimeType}</p>  
          <p><strong>ขอแจ้งลางานเนื่องจาก</strong> ${data.detailWork}</p>
          <p><strong>วันที่ </strong> ${dayjs(data.dateStart)
            .add(7, 'hour')
            .format('DD-MM-YYYY')} เวลา  ${
    data.startTime ? data.startTime : ''
  }<strong>ถึงเวลา  ${data.endTime ? data.endTime : ''}</p>
          <p><strong>สามารถติดต่อได้ที่เบอร์ </strong> ${data.phoneNumber}</p>
          </div>
           <div style="margin: 30px 0; text-align: center; ${
             status === 'approved' ? 'color: #3498db;' : 'color: red;'
           } font-weight: bold;">
${status === 'approved' ? '' : 'ไม่'}อนุมัติ
          </div>
          <div style="text-align: center; color: #555;">
              ขอบคุณครับ<br />
            ณ วันที่ <strong>${dayjs(new Date())
              .add(7, 'hour')
              .format('DD-MM-YYYY')}</strong> เวลา <strong>${dayjs(new Date())
    .add(7, 'hour')
    .format('HH:mm')}</strong>
          </div>
         <div style="margin-top: 30px; text-align: center;">
  <img src="${footerSrc}" alt="Footer" style="width: 100%; max-width: 600px; display: block; margin: 0 auto;" />
</div>
        </div>
      </body>
    </html>
  `;
};
