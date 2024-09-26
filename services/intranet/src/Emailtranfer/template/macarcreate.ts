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
   <div
      class="base"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      "
    >
      <div
        class="head"
        style="
          margin: 20px 10px 10px 0;
          border: 10px solid rgb(88, 162, 247);
          width: 800px;
        "
      >
        <div
          class="image"
          style="
            text-align: center;
            /* border: 10px solid rgb(56, 73, 92); */
            margin: 20px 20px 30px 20px;
          "
        >
          <img
            style="width: 400px; height: 150px"
            src="cid:unique@j139049.png" alt="OSD"
          />
        </div>
        <p style="text-align: center; font-size: 24px">
          มีการสร้าง task MaCar warpup ใหม่
        </p>

        <div
          class="image"
          style="
            text-align: center;
            margin: 20px 20px 10px 20px;
            font-size: 16px;
          "
        >
          <p>
            มีการทำ task ใหม่ ในลำดับที่ ${ maCarWrapup.id }
            เพื่อการสร้างการตรวจสอบสภาพรถ
          </p>
          <div
            class="image"
            style="
              text-align: left;
              margin: 20px 80px 10px 80px;
              font-size: 16px;
            "
          >
            <p>
              สำหรับรถ :
              <span style="font-weight: bold">${ maCarWrapup.carName }</span>
            </p>

            <p>โดยเลขไมล์รถเดิมอยู่ที่ : ${maCarWrapup.wrapupMiles} กิโลเมตร</p>
            <p>
              เพื่อเช็คสภาพในส่วนของ :
              <span style="font-style: italic">${ maCarWrapup.typeName }</span>
            </p>
            <p>สถานที่ทำการตรวจสภาพที่ : ${maCarWrapup.vender}</p>
            <p>โดยมีจุดประสงค์ในการตรวจสภาพดังนี้ :</p>
            <p style="padding-left: 20px">${maCarWrapup.detail}</p>
            <p>
              มีค่าใช้จ่ายทั้งสิ้น :
              <span style="color: green;font-size: 18px;"
                >${formatCurrency( Number(maCarWrapup.cost), )} บาท</span
              >
            </p>
            <p>หมายเหตุ : ${maCarWrapup.remark}</p>
            <p>
              โดยการสร้าง task จะเริ่มที่เวลา ${formatThaiDate( new
              Date(maCarWrapup.createdAt), )}
            </p>
            <p>สถานะการตรวจเช็ค : ${maCarWrapup.status=== true 
              ? 'ผ่านการตรวจเช็ค' 
              : maCarWrapup.status === false 
                ? 'ไม่ผ่านการตรวจเช็ค' 
                : 'รอการอนุมัติ'}</p>
          </div>
        </div>
      </div>
    </div>
`;
}
