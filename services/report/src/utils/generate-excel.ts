import { Workbook } from 'exceljs';
export async function TemplateExcel(data: any[], sheetName: string) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(sheetName);
  const headers = [
    'No.',
    'ประเภท MA',
    'ชื่อ MA',
    'วันนัดหมาย',
    'สถานะ',
    'ผู้นัดหมาย',
    'วันที่สร้าง',
    'วันที่อัปเดต',
  ];
  worksheet.addRow(headers);
  for (let i = 0; i < data.length; i++) {
    for (const key in data[i]) {
      if (data[i][key] === undefined || !data[i][key]) {
        if (typeof data[i][key] === 'number') {
          data[i][key] = 0;
        } else {
          data[i][key] = '';
        }
      }
    }
  }
  data.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });
  worksheet.columns.forEach((column) => {
    let maxLength = 10; // minimum width

    column.eachCell({ includeEmpty: true }, (cell) => {
      const value = cell.value;

      let text = '';

      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        text = value.toString();
      } else if (value instanceof Date) {
        text = value.toISOString();
      } else if (value && typeof value === 'object') {
        if ('richText' in value && Array.isArray(value.richText)) {
          text = value.richText.map((rt) => rt.text).join('');
        } else if ('formula' in value && value.result) {
          text = value.result.toString();
        } else if ('text' in value) {
          text = value.text;
        }
      }

      if (text.length > maxLength) {
        maxLength = text.length;
      }
    });

    column.width = maxLength + 2; // Add padding
  });
  worksheet.eachRow((row, rowNumber) => {
    const isHeader = rowNumber === 1;
    const isLastRow = rowNumber === worksheet.rowCount;
    const baseFont = {
      size: 12,
      bold: isHeader || isLastRow,
    };

    row.eachCell((cell, cellNumber) => {
      cell.font = baseFont;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = { wrapText: true, vertical: 'top' };
      if (isHeader) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF25B9EB' },
        };
      }
    });
  });

  const bufferArray = await workbook.xlsx.writeBuffer();
  return Buffer.from(bufferArray);
}

export async function OvertimeExcelTemplate(data: any[], sheetName: string) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // กำหนด headers
  const headers = [
    'ลำดับ',
    'ชื่อ-นามสกุล',
    'วันที่สร้าง',
    'วันที่เริ่มงาน',
    'ประเภทงาน',
    'เวลาเริ่ม',
    'เวลาสิ้นสุด',
    'เวลาพัก (ชั่วโมง)',
    'เวลาทำงาน (ชั่วโมง)',
    'เวลารวม (ชั่วโมง)',
    'รายละเอียดงาน',
    'ประเภทวัน',
    'ชื่อลูกค้า',
    'เดินทางต่างจังหวัด',
    'ค้างคืน',
    'ใช้รถบริษัท',
    'ชื่อรถ',
    'รหัสรถ',
    'ระยะทาง',
    'อื่นๆ',
    'เบอร์โทรศัพท์',
    'สถานะ',
    'วันที่อนุมัติ',
    'ผู้อนุมัติ',
    'รายละเอียดการอนุมัติ',
    'ค่าล่วงเวลา',
    'ค่าล่วงเวลา',
    'ค่าล่วงเวลา',
  ];

  // เพิ่ม header row หลัก
  worksheet.addRow(headers);

  // เพิ่ม sub-header row
  const subHeaders = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'อัตรา 1 เท่า',
    'อัตรา 1.5 เท่า',
    'อัตรา 3 เท่า',
  ];
  worksheet.addRow(subHeaders);

  // จัดรูปแบบข้อมูล
  const formattedData = data;

  // จัดการข้อมูลที่เป็น undefined หรือ null
  for (let i = 0; i < formattedData.length; i++) {
    for (const key in formattedData[i]) {
      if (
        formattedData[i][key] === undefined ||
        formattedData[i][key] === null
      ) {
        if (typeof formattedData[i][key] === 'number') {
          formattedData[i][key] = 0;
        } else {
          formattedData[i][key] = '';
        }
      }
    }
  }

  // เพิ่มข้อมูลลงใน worksheet
  formattedData.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });

  // merge cells สำหรับ header หลัก
  worksheet.mergeCells('Z1:AB1'); // อัตราเวลาปกติ

  // จัดขนาดของ column ให้เหมาะสม
  worksheet.columns.forEach((column) => {
    let maxLength = 15; // minimum width

    column.eachCell({ includeEmpty: true }, (cell) => {
      const value = cell.value;
      let text = '';

      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        text = value.toString();
      } else if (value instanceof Date) {
        text = value.toLocaleDateString('th-TH');
      } else if (value && typeof value === 'object') {
        if ('richText' in value && Array.isArray(value.richText)) {
          text = value.richText.map((rt) => rt.text).join('');
        } else if ('formula' in value && value.result) {
          text = value.result.toString();
        } else if ('text' in value) {
          text = value.text;
        }
      }

      // คำนวณความกว้างสำหรับข้อความภาษาไทย
      const thaiTextLength = text.length * 1.2; // เพิ่มขนาดสำหรับฟอนต์ภาษาไทย
      if (thaiTextLength > maxLength) {
        maxLength = thaiTextLength;
      }
    });

    column.width = Math.min(maxLength + 2, 50); // จำกัดความกว้างสูงสุด
  });

  // จัดรูปแบบของ row
  worksheet.eachRow((row, rowNumber) => {
    const isHeader = rowNumber === 1;
    const isSubHeader = rowNumber === 2;
    const baseFont = {
      size: 12,
      bold: isHeader || isSubHeader,
      name: 'TH SarabunPSK', // ฟอนต์ภาษาไทย
    };

    row.eachCell((cell, cellNumber) => {
      cell.font = baseFont;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
      };

      if (isHeader || isSubHeader) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF4472C4' }, // สีน้ำเงิน
        };
        cell.font = { ...baseFont, color: { argb: 'FFFFFFFF' } }; // ตัวอักษรสีขาว
      } else {
        // จัดตำแหน่งข้อมูลตามประเภท
        if (cellNumber === 1) {
          // ลำดับ
          cell.alignment = { ...cell.alignment, horizontal: 'center' };
        } else if ([5, 6, 7, 8, 9, 25, 26, 27, 28].includes(cellNumber)) {
          // เวลาและตัวเลข
          cell.alignment = { ...cell.alignment, horizontal: 'center' };
        } else {
          cell.alignment = { ...cell.alignment, horizontal: 'left' };
        }
      }
    });
  });
  const lastCol = getColumnLetter(headers.length);
  // เพิ่ม autofilter (เริ่มจาก row 2 เพราะมี sub-header)
  worksheet.autoFilter = {
    from: 'A2',
    to: `${lastCol}2`,
  };

  // freeze panes (freeze 2 rows)
  worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 2 }];

  const bufferArray = await workbook.xlsx.writeBuffer();
  return Buffer.from(bufferArray);
}

function getColumnLetter(colIndex: number): string {
  let temp: number;
  let letter = '';
  while (colIndex > 0) {
    temp = (colIndex - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    colIndex = Math.floor((colIndex - temp - 1) / 26);
  }
  return letter;
}

export async function DataLeaveExcelTemplate(data: any[], sheetName: string) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // กำหนด headers ตามข้อมูลการลา
  const headers = [
    'ลำดับ',
    'ชื่อ - นามสกุล',
    'ตำแหน่ง',
    'ประเภทการลา',
    'วันที่ลา',
    'สถานะ',
    'ผู้อนุมัติ',
    'วันที่อนุมัติ',
    'รายละเอียด',
  ];

  // เพิ่ม header row
  worksheet.addRow(headers);

  // จัดรูปแบบข้อมูล
  const formattedData = data.map((item, index) => ({
    ลำดับ: index + 1,
    'ชื่อ - นามสกุล': item['ชื่อ - นามสกุล'] || '',
    ตำแหน่ง: item.ตำแหน่ง || '',
    ประเภทการลา: item.ประเภทการลา || '',
    วันที่ลา: item.วันที่ลา || '',
    สถานะ: item.สถานะ || '',
    ผู้อนุมัติ: item.ผู้อนุมัติ || '',
    วันที่อนุมัติ: item.วันที่อนุมัติ || '',
    รายละเอียด: item.รายละเอียด || '',
  }));

  // จัดการข้อมูลที่เป็น undefined หรือ null
  for (let i = 0; i < formattedData.length; i++) {
    for (const key in formattedData[i]) {
      if (
        formattedData[i][key] === undefined ||
        formattedData[i][key] === null
      ) {
        if (typeof formattedData[i][key] === 'number') {
          formattedData[i][key] = 0;
        } else {
          formattedData[i][key] = '';
        }
      }
    }
  }

  // เพิ่มข้อมูลลงใน worksheet
  formattedData.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });

  // จัดขนาดของ column ให้เหมาะสม
  worksheet.columns.forEach((column) => {
    let maxLength = 15; // minimum width

    column.eachCell({ includeEmpty: true }, (cell) => {
      const value = cell.value;
      let text = '';

      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        text = value.toString();
      } else if (value instanceof Date) {
        text = value.toLocaleDateString('th-TH');
      } else if (value && typeof value === 'object') {
        if ('richText' in value && Array.isArray(value.richText)) {
          text = value.richText.map((rt) => rt.text).join('');
        } else if ('formula' in value && value.result) {
          text = value.result.toString();
        } else if ('text' in value) {
          text = value.text;
        }
      }

      // คำนวณความกว้างสำหรับข้อความภาษาไทย
      const thaiTextLength = text.length * 1.2; // เพิ่มขนาดสำหรับฟอนต์ภาษาไทย
      if (thaiTextLength > maxLength) {
        maxLength = thaiTextLength;
      }
    });

    column.width = Math.min(maxLength + 2, 50); // จำกัดความกว้างสูงสุด
  });

  // จัดรูปแบบของ row
  worksheet.eachRow((row, rowNumber) => {
    const isHeader = rowNumber === 1;
    const baseFont = {
      size: 12,
      bold: isHeader,
      name: 'TH SarabunPSK', // ฟอนต์ภาษาไทย
    };

    row.eachCell((cell, cellNumber) => {
      cell.font = baseFont;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
      };

      if (isHeader) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF4472C4' }, // สีน้ำเงิน
        };
        cell.font = { ...baseFont, color: { argb: 'FFFFFFFF' } }; // ตัวอักษรสีขาว
      } else {
        // จัดตำแหน่งข้อมูลตามประเภท
        if (cellNumber === 1) {
          // ลำดับ
          cell.alignment = { ...cell.alignment, horizontal: 'center' };
        } else if ([6].includes(cellNumber)) {
          // สถานะ
          cell.alignment = { ...cell.alignment, horizontal: 'center' };
        } else {
          cell.alignment = { ...cell.alignment, horizontal: 'left' };
        }
      }
    });
  });

  const lastCol = getColumnLetter(headers.length);
  // เพิ่ม autofilter
  worksheet.autoFilter = {
    from: 'A1',
    to: `${lastCol}1`,
  };

  // freeze panes (freeze 1 row สำหรับ header)
  worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];

  const bufferArray = await workbook.xlsx.writeBuffer();
  return Buffer.from(bufferArray);
}

export async function TemplateExcelEmpAsset(data: any[], sheetName: string) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(sheetName);
  const headers = [
    'No',
    'ประเภททรัพย์สิน',
    'ทรัพย์สินส่วนกลาง',
    'ชื่อทรัพย์สิน',
    'ประเภททรัพย์สินอื่นๆ',
    'ยี่ห้อ',
    'Serial',
    'Asset No.',
    'สถานะ',
    'ที่ตั้ง',
    'รายละเอียดอุปกรณ์',
  ];
  worksheet.addRow(headers);
  for (let i = 0; i < data.length; i++) {
    for (const key in data[i]) {
      if (data[i][key] === undefined || !data[i][key]) {
        if (typeof data[i][key] === 'number') {
          data[i][key] = 0;
        } else {
          data[i][key] = '';
        }
      }
    }
  }
  data.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });
  worksheet.columns.forEach((column) => {
    let maxLength = 10; // minimum width

    column.eachCell({ includeEmpty: true }, (cell) => {
      const value = cell.value;

      let text = '';

      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        text = value.toString();
      } else if (value instanceof Date) {
        text = value.toISOString();
      } else if (value && typeof value === 'object') {
        if ('richText' in value && Array.isArray(value.richText)) {
          text = value.richText.map((rt) => rt.text).join('');
        } else if ('formula' in value && value.result) {
          text = value.result.toString();
        } else if ('text' in value) {
          text = value.text;
        }
      }

      if (text.length > maxLength) {
        maxLength = text.length;
      }
    });

    column.width = maxLength + 2; // Add padding
  });
  worksheet.eachRow((row, rowNumber) => {
    const isHeader = rowNumber === 1;
    const isLastRow = rowNumber === worksheet.rowCount;
    const baseFont = {
      size: 12,
      bold: isHeader || isLastRow,
    };

    row.eachCell((cell, cellNumber) => {
      cell.font = baseFont;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = { wrapText: true, vertical: 'top' };
      if (isHeader) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF25B9EB' },
        };
      }
    });
  });

  const bufferArray = await workbook.xlsx.writeBuffer();
  return Buffer.from(bufferArray);
}

export async function TemplateExcelEmpAssetTeams(
  data: any[],
  sheetName: string,
) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(sheetName);
  const headers = [
    'No',
    'ชื่อ',
    'แผนก',
    'ประเภททรัพย์สิน',
    'ทรัพย์สินส่วนกลาง',
    'ชื่อทรัพย์สิน',
    'ประเภททรัพย์สินอื่นๆ',
    'ยี่ห้อ',
    'Serial',
    'Asset No.',
    'สถานะ',
    'ที่ตั้ง',
    'รายละเอียดอุปกรณ์',
  ];
  worksheet.addRow(headers);
  for (let i = 0; i < data.length; i++) {
    for (const key in data[i]) {
      if (data[i][key] === undefined || !data[i][key]) {
        if (typeof data[i][key] === 'number') {
          data[i][key] = 0;
        } else {
          data[i][key] = '';
        }
      }
    }
  }
  data.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });
  worksheet.columns.forEach((column) => {
    let maxLength = 10; // minimum width

    column.eachCell({ includeEmpty: true }, (cell) => {
      const value = cell.value;

      let text = '';

      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        text = value.toString();
      } else if (value instanceof Date) {
        text = value.toISOString();
      } else if (value && typeof value === 'object') {
        if ('richText' in value && Array.isArray(value.richText)) {
          text = value.richText.map((rt) => rt.text).join('');
        } else if ('formula' in value && value.result) {
          text = value.result.toString();
        } else if ('text' in value) {
          text = value.text;
        }
      }

      if (text.length > maxLength) {
        maxLength = text.length;
      }
    });

    column.width = maxLength + 2; // Add padding
  });
  worksheet.eachRow((row, rowNumber) => {
    const isHeader = rowNumber === 1;
    const isLastRow = rowNumber === worksheet.rowCount;
    const baseFont = {
      size: 12,
      bold: isHeader || isLastRow,
    };

    row.eachCell((cell, cellNumber) => {
      cell.font = baseFont;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = { wrapText: true, vertical: 'top' };
      if (isHeader) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF25B9EB' },
        };
      }
    });
  });

  const bufferArray = await workbook.xlsx.writeBuffer();
  return Buffer.from(bufferArray);
}
