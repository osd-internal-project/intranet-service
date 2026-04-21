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

interface CarWrapup {
  id: number;
  carWrapupId: string;
  carId: string;
  carName: string;
  typeId: number;
  typeName: string;
  vender: string;
  cost: Prisma.Decimal;
  detail: string;
  wrapupMiles: string;
  dateStart: Date;
  nextCheckDate: boolean;
  dateEnd: Date;
  remark: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  createbyName: string;
}

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
          <p><strong>เนื่องจาก</strong> ${data.carBookTitle}</p>
          <p><strong>สถานที่จอด</strong> ${data.carBookPlace}</p>
          <p><strong>วันที่ </strong> ${dayjs(data.carBookStartDate).format(
            'DD-MM-YYYY HH:mm ',
          )}<strong> ถึงวันที่ </strong> ${dayjs(data.carBookEndDate).format(
    'DD-MM-YYYY HH:mm ',
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
          <p><strong>เนื่องจาก</strong> ${data.carBookTitle}</p>
          <p><strong>สถานที่จอด</strong> ${data.carBookPlace}</p>
          <p><strong>วันที่ </strong> ${dayjs(data.carBookStartDate).format(
            'DD-MM-YYYY HH:mm ',
          )}<strong> ถึงวันที่ </strong> ${dayjs(data.carBookEndDate).format(
    'DD-MM-YYYY HH:mm ',
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
          <p><strong>เนื่องจาก</strong> ${data.carBookTitle}</p>
          <p><strong>สถานที่จอด</strong> ${data.carBookPlace}</p>
          <p><strong>วันที่ </strong> ${dayjs(data.carBookStartDate).format(
            'DD-MM-YYYY HH:mm ',
          )}<strong> ถึงวันที่ </strong> ${dayjs(data.carBookEndDate).format(
    'DD-MM-YYYY HH:mm ',
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

export const templateMacar = async (
  recipients: any[],
  tasks: any[],
): Promise<string> => {
  return `
    <!DOCTYPE html>
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>เช็คสภาพ</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: 'Sarabun', sans-serif;
            background-color: #f0f2f5;
            padding: 32px 16px;
            color: #1a1a2e;
          }

          .wrapper {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          }

          /* ── Header ── */
          .header {
            background: #1a1a2e;
            padding: 36px 40px 28px;
            text-align: center;
          }
          .header img { height: 72px; margin-bottom: 16px; }
          .header h2 {
            font-size: 18px;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: 0.04em;
          }

          /* ── Body ── */
          .body {
            padding: 32px 40px;
          }

          .meta-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }
          .date-badge {
            font-size: 12px;
            font-weight: 500;
            color: #888;
            background: #f5f5f5;
            padding: 4px 12px;
            border-radius: 20px;
          }

          .greeting {
            font-size: 15px;
            color: #444;
            margin-bottom: 6px;
          }
          .greeting strong { color: #1a1a2e; font-weight: 600; }

          .subtitle {
            font-size: 13px;
            color: #888;
            margin-bottom: 28px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f0f0f0;
          }

          /* ── Task Card ── */
          .task-card {
            border: 1px solid #ebebeb;
            border-radius: 10px;
            margin-bottom: 16px;
            overflow: hidden;
          }
          .task-card-accent {
            height: 3px;
            background: linear-gradient(90deg, #1a1a2e 0%, #3a5bd9 100%);
          }
          .task-card-body {
            padding: 18px 20px;
          }
          .task-name {
            font-size: 15px;
            font-weight: 600;
            color: #1a1a2e;
            margin-bottom: 12px;
          }
          .task-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 16px;
          }
          .task-field { font-size: 13px; color: #555; }
          .task-field span {
            display: block;
            font-size: 11px;
            font-weight: 600;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin-bottom: 2px;
          }
          .task-field.full { grid-column: 1 / -1; }

          .task-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 14px;
            padding-top: 12px;
            border-top: 1px solid #f5f5f5;
          }
          .task-date { font-size: 12px; color: #777; }
          .status-badge {
            font-size: 11px;
            font-weight: 600;
            padding: 3px 10px;
            border-radius: 20px;
            letter-spacing: 0.04em;
          }
          .status-process {
            background: #fff4e6;
            color: #e67e22;
          }
          .status-done {
            background: #e8f8f0;
            color: #27ae60;
          }

          /* ── Footer ── */
          .footer-text {
            text-align: center;
            font-size: 13px;
            color: #aaa;
            padding: 24px 40px 0;
            line-height: 1.7;
          }
          .footer-text strong { color: #555; }

          .footer-img {
            margin-top: 24px;
          }
          .footer-img img {
            width: 100%;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">

          <!-- Header -->
          <div class="header">
            <img src="${logoSrc}" alt="Logo" />
            <h2>แจ้งเตือนงานเช็คสภาพ</h2>
          </div>

          <!-- Body -->
          <div class="body">

            <div class="meta-row">
              <p class="greeting">
                <strong>เรียน</strong>&nbsp;
                ${recipients
                  .map(
                    (user: any) => `คุณ ${user.firstNameTh} ${user.lastNameTh}`,
                  )
                  .join(' , ')}
              </p>
              <span class="date-badge">${dayjs().format(
                'DD / MM / YYYY',
              )}</span>
            </div>

            <p class="subtitle">ระบบขอแจ้งเตือนรายการดังต่อไปนี้</p>

            <!-- Task Cards -->
            ${tasks
              .map(
                (task: any) => `
              <div class="task-card">
                <div class="task-card-accent"></div>
                <div class="task-card-body">
                  <p class="task-name">${task.maName}</p>
                  <div class="task-grid">
                    <div class="task-field">
                      <span>ประเภท</span>${task.maTypeName}
                    </div>
                    <div class="task-field">
                      <span>ผู้รับผิดชอบ</span>${task.assignUsername}
                    </div>
                    <div class="task-field">
                      <span>ติดต่อ</span>${task.contact}
                    </div>
                    <div class="task-field full">
                      <span>รายละเอียด</span>${task.detail || '-'}
                    </div>
                  </div>
                  <div class="task-footer">
                    <span class="task-date">📅 ${dayjs(task.maDate).format(
                      'DD MMM YYYY — HH:mm',
                    )}</span>
                    <span class="status-badge ${
                      task.maStatus === 'process'
                        ? 'status-process'
                        : 'status-done'
                    }">
                      ${
                        task.maStatus === 'process'
                          ? '⏳ กำลังดำเนินการ'
                          : '✅ เสร็จสิ้น'
                      }
                    </span>
                  </div>
                </div>
              </div>
            `,
              )
              .join('')}

            <!-- Footer Text -->
            <div class="footer-text">
              ด้วยความเคารพ<br />
              ณ วันที่ <strong>${dayjs().format('DD / MM / YYYY')}</strong>
              &nbsp;เวลา <strong>${dayjs().format('HH:mm')} น.</strong>
            </div>
          </div>

          <!-- Footer Image -->
          <div class="footer-img">
            <img src="${footerSrc}" alt="Footer" />
          </div>

        </div>
      </body>
    </html>
  `;
};

export const templateCarWrapup = async (
  recipients: any[],
  wrapups: CarWrapup[],
): Promise<string> => {
  return `
    <!DOCTYPE html>
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>สรุปการซ่อมบำรุงรถ</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
 
          body {
            font-family: 'Sarabun', sans-serif;
            background-color: #f0f2f5;
            padding: 32px 16px;
            color: #1a1a2e;
          }
 
          .wrapper {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          }
 
          /* ── Header ── */
          .header {
            background: #1a1a2e;
            padding: 36px 40px 28px;
            text-align: center;
          }
          .header img { height: 72px; margin-bottom: 16px; }
          .header h2 {
            font-size: 18px;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: 0.04em;
          }
 
          /* ── Body ── */
          .body {
            padding: 32px 40px;
          }
 
          .meta-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }
          .date-badge {
            font-size: 12px;
            font-weight: 500;
            color: #888;
            background: #f5f5f5;
            padding: 4px 12px;
            border-radius: 20px;
          }
 
          .greeting {
            font-size: 15px;
            color: #444;
            margin-bottom: 6px;
          }
          .greeting strong { color: #1a1a2e; font-weight: 600; }
 
          .subtitle {
            font-size: 13px;
            color: #888;
            margin-bottom: 28px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f0f0f0;
          }
 
          /* ── Wrapup Card ── */
          .task-card {
            border: 1px solid #ebebeb;
            border-radius: 10px;
            margin-bottom: 16px;
            overflow: hidden;
          }
          .task-card-accent {
            height: 3px;
            background: linear-gradient(90deg, #1a1a2e 0%, #3a5bd9 100%);
          }
          .task-card-body {
            padding: 18px 20px;
          }
          .task-name {
            font-size: 15px;
            font-weight: 600;
            color: #1a1a2e;
            margin-bottom: 12px;
          }
          .task-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 16px;
          }
          .task-field { font-size: 13px; color: #555; }
          .task-field span {
            display: block;
            font-size: 11px;
            font-weight: 600;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin-bottom: 2px;
          }
          .task-field.full { grid-column: 1 / -1; }
 
          .task-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 14px;
            padding-top: 12px;
            border-top: 1px solid #f5f5f5;
          }
          .task-date { font-size: 12px; color: #777; }
          .status-badge {
            font-size: 11px;
            font-weight: 600;
            padding: 3px 10px;
            border-radius: 20px;
            letter-spacing: 0.04em;
          }
          .status-active {
            background: #e8f8f0;
            color: #27ae60;
          }
          .status-inactive {
            background: #fdecea;
            color: #e74c3c;
          }
 
          /* ── Footer ── */
          .footer-text {
            text-align: center;
            font-size: 13px;
            color: #aaa;
            padding: 24px 40px 0;
            line-height: 1.7;
          }
          .footer-text strong { color: #555; }
 
          .footer-img {
            margin-top: 24px;
          }
          .footer-img img {
            width: 100%;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
 
          <!-- Header -->
          <div class="header">
            <img src="${logoSrc}" alt="Logo" />
            <h2>แจ้งเตือนสรุปการซ่อมบำรุงรถ</h2>
          </div>
 
          <!-- Body -->
          <div class="body">
 
            <div class="meta-row">
              <p class="greeting">
                <strong>เรียน</strong>&nbsp;
                ${recipients
                  .map(
                    (user: any) => `คุณ ${user.firstNameTh} ${user.lastNameTh}`,
                  )
                  .join(' , ')}
              </p>
              <span class="date-badge">${dayjs().format(
                'DD / MM / YYYY',
              )}</span>
            </div>
 
            <p class="subtitle">ระบบขอแจ้งเตือนรายการดังต่อไปนี้</p>
 
            <!-- Wrapup Cards -->
            ${wrapups
              .map(
                (wrapup: CarWrapup) => `
              <div class="task-card">
                <div class="task-card-accent"></div>
                <div class="task-card-body">
                  <p class="task-name">🚗 ${wrapup.carName}</p>
                  <div class="task-grid">
                    <div class="task-field">
                      <span>ประเภท</span>${wrapup.typeName}
                    </div>
                    <div class="task-field">
                      <span>ผู้ดำเนินการ</span>${wrapup.createbyName}
                    </div>
                    <div class="task-field">
                      <span>ผู้ให้บริการ</span>${wrapup.vender || '-'}
                    </div>
                    <div class="task-field">
                      <span>ค่าใช้จ่าย</span>${Number(
                        wrapup.cost,
                      ).toLocaleString('th-TH')} บาท
                    </div>
                    <div class="task-field">
                      <span>เลขไมล์</span>${wrapup.wrapupMiles || '-'}
                    </div>
                    <div class="task-field">
                      <span>นัดเช็คครั้งถัดไป</span>${
                        wrapup.nextCheckDate ? '✅ มีนัด' : '—'
                      }
                    </div>
                    <div class="task-field full">
                      <span>รายละเอียด</span>${wrapup.detail || '-'}
                    </div>
                    <div class="task-field full">
                      <span>หมายเหตุ</span>${wrapup.remark || '-'}
                    </div>
                  </div>
                  <div class="task-footer">
                    <span class="task-date">
                      📅 ${dayjs(wrapup.dateStart).format('DD MMM YYYY')}
                      ${
                        wrapup.dateEnd
                          ? ` — ${dayjs(wrapup.dateEnd).format('DD MMM YYYY')}`
                          : ''
                      }
                    </span>
                    <span class="status-badge ${
                      wrapup.status ? 'status-active' : 'status-inactive'
                    }">
                      ${wrapup.status ? '✅ เสร็จสิ้น' : '❌ ยกเลิก'}
                    </span>
                  </div>
                </div>
              </div>
            `,
              )
              .join('')}
 
            <!-- Footer Text -->
            <div class="footer-text">
              ด้วยความเคารพ<br />
              ณ วันที่ <strong>${dayjs().format('DD / MM / YYYY')}</strong>
              &nbsp;เวลา <strong>${dayjs().format('HH:mm')} น.</strong>
            </div>
          </div>
 
          <!-- Footer Image -->
          <div class="footer-img">
            <img src="${footerSrc}" alt="Footer" />
          </div>
 
        </div>
      </body>
    </html>
  `;
};
