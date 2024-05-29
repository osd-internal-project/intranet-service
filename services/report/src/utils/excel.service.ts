import { Workbook } from 'exceljs';

export async function createExcelBuffer(
  data: any[],
  sheetName: string,
): Promise<Buffer> {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(sheetName);
  // Add header row
  const headers = Object.keys(data[0]);
  worksheet.addRow(headers);
  for (let i = 0; i < data.length; i++) {
    // Iterate through each property in the object
    for (const key in data[i]) {
      // Check if the value is undefined or null, replace with an empty string
      if (data[i][key] === undefined || !data[i][key]) {
        data[i][key] = '';
      }
    }
  }
  // Add data rows
  data.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });
  headers.forEach((row, rowNumber) => {
    worksheet.getColumn(rowNumber + 1).width = 20;
  });
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell) => {
        cell.font = { bold: true, size: 12 };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'BFFDB2' },
        };
      });
    } else {
      row.eachCell((cell) => {
        cell.font = { size: 12 };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.alignment = { wrapText: true };
      });
    }
  });

  // Obtain the buffer as Uint8Array
  const bufferArray = await workbook.xlsx.writeBuffer();
  // Convert Uint8Array to Node.js Buffer
  const buffer = Buffer.from(bufferArray);

  return buffer;
}
