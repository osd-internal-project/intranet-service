export const calculate = async (
  startTimeOt: any,
  endTimeOt: any,
  OvertimeTime: any,
  typeDate: string,
) => {
  const start = parseTimeToHourDecimal(startTimeOt);
  let end = parseTimeToHourDecimal(endTimeOt);
  const overtimeWork = parseTimeToHourDecimal(OvertimeTime);
  if (end < start) {
    end += 24;
  }
  const totalTime = end - start;
  const duration = end - start;
  const breakTime =
    duration > 9 ? 1.5 : duration >= 5 ? 1 : duration > 4 ? 0.5 : 0;
  const workTime = totalTime - breakTime;
  let inTime = 0;
  let overtime = 0;
  if (typeDate === 'normall') {
    inTime = 0;
    overtime =
      end >= overtimeWork
        ? end - overtimeWork > 4
          ? end - overtimeWork - breakTime
          : end - overtimeWork
        : 0;
  } else {
    const sum: number = end - start;
    if (sum > 8) {
      inTime = 8;
      overtime = sum - 8 - breakTime;
    } else {
      inTime = sum > 4 ? sum - breakTime : sum;
      overtime = 0;
    }
  }

  return { totalTime, breakTime, workTime, inTime, overtime };
};

function parseTimeToHourDecimal(timeStr: string): number {
  const [hourStr, minStr] = timeStr.split(/[:.]/); // รองรับทั้ง ':' และ '.'
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minStr, 10);
  return hour + (minute >= 30 ? 0.5 : 0);
}
