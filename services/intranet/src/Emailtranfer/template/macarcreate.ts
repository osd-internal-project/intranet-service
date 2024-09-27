export function header(maCarWrapup: any) {
  const formatThaiDate = (date: Date) => {
    const buddhistYear = date.getFullYear() + 543;
    const formattedDate = date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('th-TH');

    return `${formattedDate.replace(
      date.getFullYear().toString(),
      buddhistYear.toString(),
    )} เวลา ${formattedTime}`;
  };
  const formatThaiDatenotime = (date: Date) => {
    const buddhistYear = date.getFullYear() + 543;
    const formattedDate = date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return `${formattedDate.replace(
      date.getFullYear().toString(),
      buddhistYear.toString(),
    )}`;
  };
  const formatCurrency = (amount: number) => {
    return amount
      .toLocaleString('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 2, // แสดงทศนิยม 2 ตำแหน่ง
        maximumFractionDigits: 2,
      })
      .replace('THB', '')
      .trim(); // ลบสัญลักษณ์ "THB" ออก
  };

  return `
   <body>
    <table
      role="presentation"
      style="width: 100%; height: 100%; background-color: #edf5ff; text-align: center;"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            style="
              background-color: #ffffff;
              border: 6px solid rgba(230, 230, 230, 0.3);
              margin: 20px;
              width: 1000px;
              text-align: left;
              padding: 40px;
              border-radius: 8px;
            "
          >
            <tr>
              <td style="text-align: right;">
                วันที่ ${formatThaiDate(new Date(maCarWrapup.createdAt))}
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 0;">
                <img
                  style="width: 115px; height: 45px;"
                  src="cid:unique@j139049.png"
                  alt="OSD"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p style="font-size: 18px; font-weight: bold;">เรียน 
                  <span style="font-weight:lighter;">ผู้ขออนุมัติการรอนุมัติ</span>
                </p>
                <p style="font-size: 18px; font-weight: bold;">หัวข้อเรื่อง 
                  <span style="font-weight:lighter;">การขอตรวจเช็คภาพรถ</span>
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="font-size: 16px;">
                  ขออนุญาตการตรวจเช็คสภาพรถในลำดับที่ ${maCarWrapup.id} เพื่อการตรวจสอบสภาพรถ ${maCarWrapup.carName} 
                  โดยการเช็คสภาพครั้งนี้เป็นการตรวจเช็ค ${maCarWrapup.typeName} เนื่องจากถึงระยะที่กำหนด ระยะ ${maCarWrapup.wrapupMiles} กิโลเมตร 
                  หรือ ระยะเวลาวันที่กำหนดที่เวลา ${formatThaiDatenotime(new Date(maCarWrapup.dateStart))} จึงเรียน เพื่อให้ผู้อนมัติทราบ
                </p>
                <p style="font-size: 18px; font-weight: bold;padding: 0 0 0 40px;"> โดยมีรายละเอียดดังนี้ </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 0 0 40px; ">
                <table style="width: 100%; border-collapse: collapse; ">
                  <tr>
                    <td style="font-size: 16px; font-weight:  bold; padding-left: 10px; width: 32%; vertical-align: top;">ชื่อรถ :</td>
                    <td style="font-size: 16px; padding-left: 10px;">${maCarWrapup.carName}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; font-weight: bold; padding-left: 10px; vertical-align: top;">เลขไมล์ :</td>
                    <td style="font-size: 16px; padding-left: 10px;">${maCarWrapup.wrapupMiles} กิโลเมตร</td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; font-weight: bold; padding-left: 10px; vertical-align: top;">วันที่ครบกำหนดตรวจสภาพ :</td>
                    <td style="font-size: 16px; padding-left: 10px; font-style: italic;">${formatThaiDatenotime(new Date(maCarWrapup.dateStart))}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; font-weight: bold; padding-left: 10px; vertical-align: top;">ประเภทการตรวจสภาพ :</td>
                    <td style="font-size: 16px; padding-left: 10px;">${maCarWrapup.typeName}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; font-weight: bold; padding-left: 10px; vertical-align: top;">สถานที่การตรวจสภาพ :</td>
                    <td style="font-size: 16px; padding-left: 10px;">${maCarWrapup.vender}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; font-weight: bold; padding-left: 10px; vertical-align: top;">รายละเอียดการตรวจสภาพ :</td>
                    <td style="font-size: 16px; padding-left: 10px;">${maCarWrapup.detail}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; font-weight: bold; padding-left: 10px; vertical-align: top;">ราคา :</td>
                    <td style="font-size: 16px; padding-left: 10px; color: green;">
                      ${formatCurrency(Number(maCarWrapup.cost))} บาท
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; font-weight: bold; padding-left: 10px; vertical-align: top;">หมายเหตุ :</td>
                    <td style="font-size: 16px; padding-left: 10px;">${maCarWrapup.remark}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <p style="font-size: 18px; font-weight: bold;"> ผู้ขออนุมัติ : 
                  <span style="font-weight: lighter;">${maCarWrapup.createbyName}</span>
                </p>
              </td>
            </tr>
          </table> vertical-align: top;
        </td>
      </tr>
    </table>
  </body>
`;
}
