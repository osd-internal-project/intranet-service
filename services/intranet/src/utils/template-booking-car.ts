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
export const templateCarBooikng = async (
  data: any,
  recipients: any[],
  findUsers: Prisma.usersWhereInput,
): Promise<string> => {
  return `
    <!DOCTYPE html>
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>จองรถออนไลน์</title>
      </head>
      <body style="font-family: sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoSrc}" alt="Logo" style="height: 100px;" />
            <h2 style="color: #2c3e50;">จองรถออนไลน์</h2>
          </div>
          <div style="text-align: right; color: #555;">วันที่ ${dayjs().format(
            'DD-MM-YYYY',
          )}</div>
          <div><strong>เรียน</strong> ${recipients
            .map((user: any) => `คุณ ${user.firstNameTh} ${user.lastNameTh}`)
            .join(' , ')}</div>
          <div style="margin-top: 20px; color: #333;">
          <p><strong>คุณ </strong>${findUsers.firstNameTh} ${
    findUsers.lastNameTh
  }</p>
          <p> <strong>จองรถ</strong>${data.carName}</p>  
          <p><strong>เนื่องจาก</strong> ${data.detail}</p>
          <p><strong>สถานที่จอด</strong> ${data.carBookPlace}</p>
          <p><strong>วันที่ </strong> ${dayjs(data.carBookStartDate).format(
            'DD-MM-YYYY HH:mm',
          )}<strong>ถึงวันที่</strong> ${dayjs(data.carBookEndDate).format(
    'DD-MM-YYYY HH:mm',
  )} </p>
          <p><strong>สามารถติดต่อได้ที่เบอร์ </strong> ${
            findUsers.phoneNumber
          }</p>
          </div>
          <div style="margin: 30px 0; text-align: center; color: #3498db; font-weight: bold;">
           จึงขออนุมัติ
          </div>
          <div style="text-align: center; color: #555;">
              ด้วยความเคารพ<br />
            ณ วันที่ <strong>${dayjs().format(
              'DD-MM-YYYY',
            )}</strong> เวลา <strong>${dayjs().format('HH:mm')}</strong>
          </div>
         <div style="margin-top: 30px; text-align: center;">
  <img src="${footerSrc}" alt="Footer" style="width: 100%; max-width: 600px; display: block; margin: 0 auto;" />
</div>
        </div>
      </body>
    </html>
  `;
};

export const templateCarBooikngReturn = async (
  data: any,
  recipients: any[],
  findUsers: Prisma.usersWhereInput,
  status: string,
): Promise<string> => {
  return `
    <!DOCTYPE html>
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>จองรถออนไลน์</title>
      </head>
      <body style="font-family: sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoSrc}" alt="Logo" style="height: 100px;" />
            <h2 style="color: #2c3e50;">จองรถออนไลน์</h2>
          </div>
          <div style="text-align: right; color: #555;">วันที่ ${dayjs().format(
            'DD-MM-YYYY',
          )}</div>
          <div><strong>เรียน</strong> ${recipients
            .map((user: any) => `คุณ ${user.firstNameTh} ${user.lastNameTh}`)
            .join(' , ')}</div>
          <div style="margin-top: 20px; color: #333;">
          <p><strong>คุณ </strong>${findUsers.firstNameTh} ${
    findUsers.lastNameTh
  }</p>
          <p> <strong>จองรถ</strong>${data.carName}</p>  
          <p><strong>เนื่องจาก</strong> ${data.detail}</p>
          <p><strong>สถานที่จอด</strong> ${data.carBookPlace}</p>
          <p><strong>วันที่ </strong> ${dayjs(data.carBookStartDate).format(
            'DD-MM-YYYY HH:mm',
          )}<strong>ถึงวันที่</strong> ${dayjs(data.carBookEndDate).format(
    'DD-MM-YYYY HH:mm',
  )} </p>
          <p><strong>สามารถติดต่อได้ที่เบอร์ </strong> ${
            findUsers.phoneNumber
          }</p>
          </div>
          <div style="margin: 30px 0; text-align: center; color: #3498db; font-weight: bold;">
           แจ้งขอคืนรถทะเบียน ${data.carName}
          </div>

          <div style="text-align: center; color: #555;">
              ด้วยความเคารพ<br />
            ณ วันที่ <strong>${dayjs().format(
              'DD-MM-YYYY',
            )}</strong> เวลา <strong>${dayjs().format('HH:mm')}</strong>
          </div>
         <div style="margin-top: 30px; text-align: center;">
  <img src="${footerSrc}" alt="Footer" style="width: 100%; max-width: 600px; display: block; margin: 0 auto;" />
</div>
        </div>
      </body>
    </html>
  `;
};

export const templateCarBooikngApproved = async (
  data: any,
  recipients: any[],
  findUsers: Prisma.usersWhereInput,
  status: string,
): Promise<string> => {
  return `
    <!DOCTYPE html>
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>จองรถออนไลน์</title>
      </head>
      <body style="font-family: sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoSrc}" alt="Logo" style="height: 100px;" />
            <h2 style="color: #2c3e50;">จองรถออนไลน์</h2>
          </div>
          <div style="text-align: right; color: #555;">วันที่ ${dayjs().format(
            'DD-MM-YYYY',
          )}</div>
          <div><strong>เรียน</strong> ${recipients
            .map((user: any) => `คุณ ${user.firstNameTh} ${user.lastNameTh}`)
            .join(' , ')}</div>
          <div style="margin-top: 20px; color: #333;">
          <p><strong>คุณ </strong>${findUsers.firstNameTh} ${
    findUsers.lastNameTh
  }</p>
          <p> <strong>จองรถ</strong>${data.carName}</p>  
          <p><strong>เนื่องจาก</strong> ${data.detail}</p>
          <p><strong>สถานที่จอด</strong> ${data.carBookPlace}</p>
          <p><strong>วันที่ </strong> ${dayjs(data.carBookStartDate).format(
            'DD-MM-YYYY HH:mm',
          )}<strong>ถึงวันที่</strong> ${dayjs(data.carBookEndDate).format(
    'DD-MM-YYYY HH:mm',
  )} </p>
          <p><strong>สามารถติดต่อได้ที่เบอร์ </strong> ${
            findUsers.phoneNumber
          }</p>
          </div>
          <div style="margin: 30px 0; text-align: center; color: #3498db; font-weight: bold;">
           ${status === 'Completed' ? 'รับคืนแล้ว' : 'อนุมัติ'} การจองรถยนต์
          </div>
          <div style="text-align: center; color: #555;">
              ด้วยความเคารพ<br />
            ณ วันที่ <strong>${dayjs().format(
              'DD-MM-YYYY',
            )}</strong> เวลา <strong>${dayjs().format('HH:mm')}</strong>
          </div>
         <div style="margin-top: 30px; text-align: center;">
  <img src="${footerSrc}" alt="Footer" style="width: 100%; max-width: 600px; display: block; margin: 0 auto;" />
</div>
        </div>
      </body>
    </html>
  `;
};
