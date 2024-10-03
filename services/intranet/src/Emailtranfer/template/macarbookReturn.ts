export function macarbookReturn(updatemacar: any) {
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

  return `<body>
    <table
      class="base"
      style="
        width: 100%;
        height: 100vh;
        text-align: center;
        background-color: #EDF5FF;
      "
      cellpadding="0"
      cellspacing="0"
      border="0"
    >
      <tr>
        <td align="center" valign="middle">
          <table
            class="head"
            style="
              background-color: #ffffff;
              margin: 0;
              width: 800px;
              border-radius: 40px;
              border: 6px solid rgba(230, 230, 230, 0.3);
              padding: 20px;
            "
            cellpadding="0"
            cellspacing="0"
            border="0"
          >
            <tr>
              <td style="text-align: left; padding: 40px 20px">
                <img
                  style="width: 115px; height: 45px"
                  src="cid:unique@j139049.png"
                  alt="OSD"
                />
              </td>
            </tr>
            <tr>
              <td style="text-align: right; padding: 0 100px">
                วันที่ ${formatThaiDate(new Date(updatemacar.createdAt))}
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px">
                <p style="font-size: 16px; font-weight: bold">
                  เรียน
                  <samp style="font-weight: lighter"
                    >การรอนุมัติการตรวจเช็คสภาพรถ</samp
                  >
                </p>
                <p style="font-size: 16px; font-weight: bold">
                  หัวข้อเรื่อง
                  <samp style="font-weight: lighter">
                    การรอนุมัติการตรวจเช็คสภาพรถ ลำดับที่ ${updatemacar.id}
                  </samp>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 40px">
                <p>
                  อนุญาติให้มีการตรวจเช็คสภาพรถ ${updatemacar.id}
                  เพื่อการตรวจสอบสภาพรถ ${updatemacar.carName} โดยการตรวจเช็ค
                  ${updatemacar.typeName} ถึงระยะที่กำหนดที่ระยะ
                  ${updatemacar.wrapupMiles} กิโลเมตร หรือ
                  ระยะเวลาวันที่กำหนดที่เวลา ${formatThaiDatenotime(
                    new Date(updatemacar.dateStart),
                  )} จึงอนุมัติให้ทำการดำเนินการ
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px">
                <p style="font-size: 16px; font-weight: bold">
                  รายละเอียดดังนี้
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px">
                <table style="width: 100%; border-collapse: collapse">
                  <tr>
                    <td
                      style="
                        font-weight: bold;
                        width: 35%;
                        padding-left: 10px;
                        vertical-align: top;
                      "
                    >
                      ชื่อรถ :
                    </td>
                    <td style="padding-left: 10px">${updatemacar.carName}</td>
                  </tr>
                  <tr>
                    <td
                      style="
                        font-weight: bold;
                        padding-left: 10px;
                        vertical-align: top;
                      "
                    >
                      ประเภทการตรวจสภาพ :
                    </td>
                    <td style="padding-left: 10px">${updatemacar.typeName}</td>
                  </tr>
                  <tr>
                    <td
                      style="
                        font-weight: bold;
                        padding-left: 10px;
                        vertical-align: top;
                      "
                    >
                      สถานที่การตรวจสภาพ :
                    </td>
                    <td style="padding-left: 10px">${updatemacar.vender}</td>
                  </tr>
                  <tr>
                    <td
                      style="
                        font-weight: bold;
                        padding-left: 10px;
                        vertical-align: top;
                      "
                    >
                      รายละเอียดการตรวจสภาพ :
                    </td>
                    <td style="padding-left: 10px">${updatemacar.detail}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: 30px;
                  color: ${
                    updatemacar.status === true
                      ? 'green'
                      : updatemacar.status === false
                      ? 'red'
                      : 'orange'
                  };
                  padding: 40px;
                "
              >
                ${
                  updatemacar.status === true
                    ? 'ผ่านการตรวจเช็ค'
                    : updatemacar.status === false
                    ? 'ไม่ผ่านการตรวจเช็ค'
                    : 'รอการอนุมัติ'
                }
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px">
                <p style="font-size: 16px; font-weight: bold">
                  ผู้อนุมัติ :
                  <samp style="font-weight: lighter"
                    >${updatemacar.createbyName}</samp
                  >
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
`;
}
