import { readFileSync } from 'fs';
import { join } from 'path';
const logo = join(__dirname, '../../assets/osd_logo.png');
const footer = join(__dirname, '../../assets/footer.jpg');
import * as dayjs from 'dayjs';
const logoBase64 = readFileSync(logo).toString('base64');
const logoSrc = `data:image/png;base64,${logoBase64}`;
const footerBase64 = readFileSync(footer).toString('base64');
const footerSrc = `data:image/png;base64,${footerBase64}`;
export const templateDataLeave = async (data: any): Promise<string> => {
  return `
   <!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ใบลาออนไลน์</title>
    <style>
        body {
            font-family: 'Sarabun', 'Tahoma', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #4CAF50;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }
        .header h2 {
            margin: 0;
            color: #2c3e50;
            font-size: 24px;
        }
        .date-top {
            text-align: right;
            color: #666;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .section {
            margin-bottom: 15px;
        }
        .label {
            display: inline-block;
            width: 80px;
            font-weight: bold;
            color: #2c3e50;
        }
        .value {
            display: inline-block;
            color: #555;
        }
        .reason-box {
            background-color: #f9f9f9;
            border-left: 4px solid #4CAF50;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .duration-box {
            background-color: #e8f5e9;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .duration-item {
            margin: 8px 0;
            padding-left: 20px;
        }
        .contact-box {
            background-color: #fff3e0;
            padding: 12px;
            border-radius: 4px;
            margin: 15px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        .signature {
            margin-top: 20px;
            text-align: right;
        }
        .timestamp {
            color: #999;
            font-size: 12px;
            text-align: right;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📋 ใบลาออนไลน์</h2>
        </div>
        
        <div class="date-top">
            วันที่ <strong>${dayjs(new Date()).format('DD-MM-YYYY')}</strong>
        </div>

        <div class="section">
            <span class="label">ถึง</span>
            <span class="value">${data.ownerName}</span>
        </div>

        <div class="section">
            <span class="label">จาก</span>
            <span class="value">คุณ${data.firstName} ${data.lastName}</span>
        </div>

        <div class="section">
            <span class="label">ขออนุญาต</span>
            <span class="value">${data.typeName}</span>
        </div>

        <div class="reason-box">
            <strong>เนื่องจาก</strong><br>
            ${data.detail}
        </div>

        <div class="duration-box">
            <strong>📅 ระยะเวลาลา:</strong>
            <div class="duration-item">
                <strong>เริ่ม:</strong> ${dayjs(data.startDate).format(
                  'DD-MM-YYYY',
                )}${data.startTime ? ` เวลา ${data.startTime} น.` : ''}
            </div>
            <div class="duration-item">
                <strong>สิ้นสุด:</strong> ${dayjs(data.endDate).format(
                  'DD-MM-YYYY',
                )}${data.endTime ? ` เวลา ${data.endTime} น.` : ''}
            </div>
        </div>

        <div class="contact-box">
            📞 <strong>สามารถติดต่อได้ที่:</strong> ${data.phoneNumber}
        </div>

        <div class="footer">
            <p style="margin: 10px 0;">จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ</p>
            
            <div class="signature">
                <p style="margin: 5px 0;">ขอแสดงความนับถือ</p>
                <p style="margin: 5px 0;"><strong>${data.firstName} ${
    data.lastName
  }</strong></p>
            </div>

            <div class="timestamp">
                ณ วันที่ ${dayjs(new Date()).format('DD-MM-YYYY')} เวลา ${dayjs(
    new Date(),
  ).format('HH:mm')} น.
            </div>
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
  dataLeave: any,
  findleaveDetail: any,
): Promise<string> => {
  return `
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <title>ใบลาออนไลน์</title>
</head>
<body style="font-family: 'Sarabun', 'Tahoma', sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        
        <!-- Header with Logo -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoSrc}" alt="Logo" style="height: 100px;" />
            <h2 style="color: #2c3e50; margin: 10px 0;">ใบลาออนไลน์</h2>
        </div>
        
        <!-- Date -->
        <div style="text-align: right; color: #555; margin-bottom: 20px;">
            วันที่ ${dayjs(new Date()).format('DD-MM-YYYY')}
        </div>
        
        <!-- To -->
        <div style="margin-bottom: 15px; font-size: 16px;">
            <strong>ถึงคุณ</strong> ${data.firstNameTh} ${data.lastNameTh}
        </div>
        
        <!-- Approval Status -->
        <div style="margin: 30px 0; padding: 20px; text-align: center; background-color: ${
          type === 'approved' ? '#e8f5e9' : '#ffebee'
        }; border-radius: 8px; border-left: 4px solid ${
    type === 'approved' ? '#4CAF50' : '#f44336'
  };">
            <div style="font-size: 24px; font-weight: bold; color: ${
              type === 'approved' ? '#2e7d32' : '#c62828'
            }; margin-bottom: 10px;">
                ${type === 'approved' ? '✓ อนุมัติ' : '✗ ไม่อนุมัติ'}
            </div>
            <div style="font-size: 18px; color: #555;">
                ${dataLeave.typeLeave}
            </div>
        </div>
        
        <!-- Leave Details -->
        <div style="margin: 25px 0; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px; border-bottom: 2px solid #4CAF50; padding-bottom: 8px;">
                📋 รายละเอียดการลา
            </h3>
            
            <!-- Employee Info -->
            <div style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-radius: 4px;">
                <div style="margin-bottom: 8px;">
                    <strong style="color: #2c3e50; display: inline-block; width: 120px;">ชื่อ-นามสกุล:</strong>
                    <span style="color: #555;">${findleaveDetail.firstName} ${
    findleaveDetail.lastName
  }</span>
                </div>
                <div style="margin-bottom: 8px;">
                    <strong style="color: #2c3e50; display: inline-block; width: 120px;">ตำแหน่ง:</strong>
                    <span style="color: #555;">${
                      findleaveDetail.position
                    }</span>
                </div>
                <div>
                    <strong style="color: #2c3e50; display: inline-block; width: 120px;">เบอร์โทรศัพท์:</strong>
                    <span style="color: #555;">${
                      findleaveDetail.phoneNumber
                    }</span>
                </div>
            </div>
            
            <!-- Leave Reason -->
            <div style="margin-bottom: 15px; padding: 15px; background-color: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px;">
                <strong style="color: #2c3e50;">เนื่องจาก:</strong><br>
                <span style="color: #555; margin-top: 5px; display: block;">${
                  findleaveDetail.detail
                }</span>
            </div>
            
            <!-- Leave Duration -->
            <div style="padding: 15px; background-color: #e3f2fd; border-radius: 4px;">
                <strong style="color: #2c3e50; display: block; margin-bottom: 10px;">📅 ระยะเวลาลา:</strong>
                <div style="margin-left: 15px;">
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #1976d2;">เริ่ม:</strong>
                        <span style="color: #555;">
                            ${dayjs(findleaveDetail.startDate).format(
                              'DD-MM-YYYY',
                            )}${
    findleaveDetail.startTime ? ` เวลา ${findleaveDetail.startTime} น.` : ''
  }
                        </span>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #1976d2;">สิ้นสุด:</strong>
                        <span style="color: #555;">
                            ${dayjs(findleaveDetail.endDate).format(
                              'DD-MM-YYYY',
                            )}${
    findleaveDetail.endTime ? ` เวลา ${findleaveDetail.endTime} น.` : ''
  }
                        </span>
                    </div>
                    <div>
                        <strong style="color: #1976d2;">จำนวนชั่วโมง:</strong>
                        <span style="color: #555;">${
                          findleaveDetail.leaveHour
                        } ชั่วโมง</span>
                    </div>
                </div>
            </div>
        </div>

        ${
          type !== 'approved' && dataLeave.detailApproved
            ? `
        <!-- Rejection Reason -->
        <div style="margin: 25px 0; padding: 15px; background-color: #ffebee; border-left: 4px solid #f44336; border-radius: 4px;">
            <strong style="color: #c62828;">เหตุผลที่ไม่อนุมัติ:</strong><br>
            <span style="color: #555; margin-top: 5px; display: block;">${dataLeave.detailApproved}</span>
        </div>
        `
            : ''
        }
        
        <!-- Approval Info -->
        <div style="margin: 25px 0; padding: 15px; background-color: #fafafa; border-radius: 4px; text-align: center;">
            <div style="color: #666; margin-bottom: 5px;">
                <strong>ผู้อนุมัติ:</strong> ${dataLeave.userApproved}
            </div>
            <div style="color: #999; font-size: 14px;">
                ณ วันที่ <strong>${dayjs(dataLeave.approvedDate).format(
                  'DD-MM-YYYY',
                )}</strong> 
                เวลา <strong>${dayjs(dataLeave.approvedDate).format(
                  'HH:mm',
                )}</strong> น.
            </div>
        </div>
        
        <!-- Footer Image -->
        <div style="margin-top: 30px; text-align: center;">
            <img src="${footerSrc}" alt="Footer" style="width: 100%; max-width: 600px; display: block; margin: 0 auto;" />
        </div>
    </div>
</body>
</html>
  `;
};
