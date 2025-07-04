export const calculate = async (
  startTimeOt: any,
  endTimeOt: any,
  OvertimeTime: any,
) => {
  const start = parseTimeToHourDecimal(startTimeOt);
  let end = parseTimeToHourDecimal(endTimeOt);
  const overtimeWork = parseTimeToHourDecimal(OvertimeTime);
  if (end < start) {
    end += 24;
  }
  const totalTime = end - start;
  const breakTime =
    end - start >= 5 ? 1 : end - start < 5 && end - start > 4 ? 0.5 : 0;
  const workTime = totalTime - breakTime;
  const inTime =
    start < overtimeWork
      ? overtimeWork - start > 4
        ? overtimeWork - start - breakTime
        : overtimeWork - start
      : 0;
  const overtime =
    end >= overtimeWork
      ? end - overtimeWork > 4
        ? end - overtimeWork - breakTime
        : end - overtimeWork
      : 0;
  return { totalTime, breakTime, workTime, inTime, overtime };
};

function parseTimeToHourDecimal(timeStr: string): number {
  const [hourStr, minStr] = timeStr.split(/[:.]/); // รองรับทั้ง ':' และ '.'
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minStr, 10);
  return hour + (minute >= 30 ? 0.5 : 0);
}
