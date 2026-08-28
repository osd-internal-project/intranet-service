export const calculate = async (
  startTimeOt: string,
  endTimeOt: string,
  OvertimeTime: string,
  typeDate: string,
  startTimeWork: string,
  endTimeWork: string,
) => {
  const start = parseTimeToHourDecimal(startTimeOt);
  let end = parseTimeToHourDecimal(endTimeOt);
  const overtimeThreshold = parseTimeToHourDecimal(OvertimeTime);
  const timestartwork = parseTimeToHourDecimal(startTimeWork);
  const timeendwork = parseTimeToHourDecimal(endTimeWork);

  // Handle cross-midnight scenarios
  if (end < start) {
    end += 24;
  }

  const totalTime = end - start;

  // Calculate break time based on total duration
  const breakTime = calculateBreakTime(totalTime);

  // Net working time after break
  const workTime = totalTime - breakTime;

  let inTime = 0;
  let overtime = 0;

  if (typeDate === 'normal') {
    // คำนวณเวลาที่อยู่ในช่วงปกติ
    const actualStart = Math.max(start, timestartwork);
    const actualEnd = Math.min(end, timeendwork);

    // เวลาทำงานในช่วงปกติ
    const normalWorkTime = Math.max(0, actualEnd - actualStart);

    // คำนวณเวลาพักในช่วงปกติ
    const normalBreakTime = calculateBreakTimeInRange(actualStart, actualEnd);

    // เวลาทำงานสุทธิในช่วงปกติ
    const normalNetWorkTime = Math.max(0, normalWorkTime - normalBreakTime);

    inTime = normalNetWorkTime;
    overtime = workTime - normalNetWorkTime;
  } else {
    // วันหยุด/พิเศษ: เกิน 8 ชั่วโมงถือเป็น OT
    const standardWorkHours = 8;

    if (workTime > standardWorkHours) {
      inTime = standardWorkHours;
      overtime = workTime - standardWorkHours;
    } else {
      inTime = workTime;
      overtime = 0;
    }
  }

  // Round to 2 decimal places for precision
  const result = {
    totalTime: Math.round(totalTime * 100) / 100,
    breakTime: Math.round(breakTime * 100) / 100,
    workTime: Math.round(workTime * 100) / 100,
    inTime: Math.round(inTime * 100) / 100,
    overtime: Math.round(overtime * 100) / 100,
  };

  console.log('Calculation Results:', result);
  return result;
};

// แก้ไข function แปลงเวลา
function parseTimeToHourDecimal(timeStr: string): number {
  const [hourStr, minStr] = timeStr.split(/[:.]/);
  const hour = parseInt(hourStr, 10) || 0;
  const minute = parseInt(minStr, 10) || 0;

  // แปลงเป็นทศนิยมที่แม่นยำ
  return hour + minute / 60;
}

// แยก function คำนวณเวลาพัก
function calculateBreakTime(duration: number): number {
  if (duration > 9) return 1.5; // เกิน 9 ชม. พัก 1.5 ชม.
  if (duration >= 5) return 1; // 5-9 ชม. พัก 1 ชม.
  if (duration > 4) return 0.5; // เกิน 4 ชม. พัก 0.5 ชม.
  return 0; // ไม่เกิน 4 ชม. ไม่พัก
}

// function คำนวณเวลาพักในช่วงเวลาที่กำหนด
function calculateBreakTimeInRange(startTime: number, endTime: number): number {
  const duration = endTime - startTime;

  // ถ้าไม่มีเวลาทำงานในช่วงปกติ ไม่มีเวลาพัก
  if (duration <= 0) return 0;

  return calculateBreakTime(duration);
}
