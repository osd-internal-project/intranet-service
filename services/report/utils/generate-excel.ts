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
