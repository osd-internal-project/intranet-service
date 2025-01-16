export const calculate = async (
  filterHolidays: any,
  result: any,
  endTimeSplit: any,
  startTimeSplit: any,
  totalTime: any,
  breakTime: any,
  workingTime: any,
  resultstartTimeSplit: any,
  resultendTimeSplit: any,
  OvertimeTime: any,
  totalMin: any,
  averageThreetimes: any,
  averageTwotime: any,
  averageOnetime: any,
  total: any,
) => {
  if (filterHolidays === undefined) {
    if (result.typeDate === 'dayoff') {
    } else {
      console.log('in-time');
      if (+endTimeSplit[0] - +startTimeSplit[0] > result.hourStartbreak) {
        if (+endTimeSplit[0] < +startTimeSplit[0]) {
          averageTwotime =
            24 -
            +startTimeSplit[0] +
            +endTimeSplit[0] -
            result.breakTime +
            totalMin;
          totalTime = 24 - +startTimeSplit[0] + +endTimeSplit[0] + totalMin;
          breakTime =
            24 - +startTimeSplit[0] + +endTimeSplit[0] > result.hourStartbreak
              ? result.breakTime
              : 0;
          workingTime = averageTwotime;
        } else {
          averageTwotime =
            +endTimeSplit[0] - +startTimeSplit[0] - result.breakTime + totalMin;
          totalTime = +endTimeSplit[0] - +startTimeSplit[0] + totalMin;
          breakTime =
            +endTimeSplit[0] - +startTimeSplit[0] > result.hourStartbreak
              ? result.breakTime
              : 0;
          workingTime = averageTwotime;
        }
      } else if (+endTimeSplit[0] - +startTimeSplit[0] < 0) {
        if (+endTimeSplit[0] < +startTimeSplit[0]) {
          averageTwotime = 24 - +startTimeSplit[0] + +endTimeSplit[0];
          totalTime =
            24 - +startTimeSplit[0] + +endTimeSplit[0] + Math.abs(totalMin);
          breakTime =
            24 - +startTimeSplit[0] + +endTimeSplit[0] >= result.hourStartbreak
              ? result.breakTime - 0.5
              : 0;
          workingTime = averageTwotime;
        } else {
          averageTwotime = +endTimeSplit[0] - +startTimeSplit[0];
          totalTime =
            +endTimeSplit[0] - +startTimeSplit[0] + Math.abs(totalMin);
          breakTime =
            +endTimeSplit[0] - +startTimeSplit[0] >= result.hourStartbreak
              ? result.breakTime - 0.5
              : 0;
          workingTime = averageTwotime;
        }
      } else {
        averageTwotime = +endTimeSplit[0] - +startTimeSplit[0] + totalMin;
        totalTime = +endTimeSplit[0] - +startTimeSplit[0] + totalMin;
        breakTime =
          +endTimeSplit[0] - +startTimeSplit[0] >= result.hourStartbreak
            ? result.breakTime
            : 0;
        workingTime = averageTwotime;
      }
    }
  } else {
    if (
      +resultstartTimeSplit[0] <= +startTimeSplit[0] &&
      +resultendTimeSplit[0] >= +endTimeSplit[0]
    ) {
      if (+endTimeSplit[0] - +startTimeSplit[0] > result.hourStartbreak) {
        averageOnetime =
          +endTimeSplit[0] - +startTimeSplit[0] == result.hourStartbreak &&
          Math.abs(totalMin) === 0.5
            ? +endTimeSplit[0] - +startTimeSplit[0] - 0.5
            : +endTimeSplit[0] - +startTimeSplit[0] > result.hourStartbreak
            ? +endTimeSplit[0] -
              +startTimeSplit[0] +
              Math.abs(totalMin) -
              result.breakTime
            : +endTimeSplit[0] -
              +startTimeSplit[0] +
              Math.abs(totalMin) -
              result.breakTime;
        totalTime = +endTimeSplit[0] - +startTimeSplit[0] + Math.abs(totalMin);
        breakTime =
          +endTimeSplit[0] - +startTimeSplit[0] > result.hourStartbreak
            ? result.breakTime
            : +endTimeSplit[0] - +startTimeSplit[0] == result.hourStartbreak &&
              Math.abs(totalMin) === 0.5
            ? 0.5
            : 0;
        workingTime = averageOnetime;
      } else {
        averageOnetime = +endTimeSplit[0] - +startTimeSplit[0] + totalMin;
        totalTime = +endTimeSplit[0] - +startTimeSplit[0] + totalMin;
        breakTime =
          +endTimeSplit[0] - +startTimeSplit[0] > result.hourStartbreak
            ? result.breakTime
            : 0;
        workingTime = averageOnetime;
      }
    } else if (
      +OvertimeTime[0] <= +startTimeSplit[0] &&
      (24 > +endTimeSplit[0] || +resultstartTimeSplit[0] > +endTimeSplit[0])
    ) {
      if (+endTimeSplit[0] - +startTimeSplit[0] >= result.hourStartbreak) {
        console.log('> 4');
        averageThreetimes =
          +endTimeSplit[0] - +startTimeSplit[0] == result.hourStartbreak &&
          Math.abs(totalMin) === 0.5
            ? +endTimeSplit[0] - +startTimeSplit[0] + Math.abs(totalMin) - 0.5
            : +endTimeSplit[0] - +startTimeSplit[0] == result.hourStartbreak &&
              Math.abs(totalMin) === 0
            ? +endTimeSplit[0] - +startTimeSplit[0] + Math.abs(totalMin)
            : +endTimeSplit[0] -
              +startTimeSplit[0] +
              Math.abs(totalMin) -
              result.breakTime;
        totalTime = +endTimeSplit[0] - +startTimeSplit[0] + Math.abs(totalMin);
        breakTime =
          +endTimeSplit[0] - +startTimeSplit[0] > result.hourStartbreak
            ? result.breakTime
            : +endTimeSplit[0] - +startTimeSplit[0] == result.hourStartbreak &&
              Math.abs(totalMin) === 0.5
            ? 0.5
            : 0;
        workingTime = averageThreetimes;
      } else if (+endTimeSplit[0] - +startTimeSplit[0] < 0) {
        console.log('> 4 but over midnight');
        averageThreetimes =
          24 - +startTimeSplit[0] + +endTimeSplit[0] > result.hourStartbreak
            ? 24 -
              +startTimeSplit[0] +
              +endTimeSplit[0] +
              totalMin -
              result.breakTime
            : 24 - +startTimeSplit[0] + +endTimeSplit[0] + totalMin;
        totalTime =
          24 - +startTimeSplit[0] + +endTimeSplit[0] + Math.abs(totalMin);
        breakTime =
          +endTimeSplit[0] - +startTimeSplit[0] > result.hourStartbreak
            ? result.breakTime
            : 0;
        workingTime = averageThreetimes;
      } else {
        averageThreetimes = +endTimeSplit[0] - +startTimeSplit[0] + totalMin;
        totalTime = +endTimeSplit[0] - +startTimeSplit[0] + Math.abs(totalMin);
        breakTime =
          +endTimeSplit[0] - +startTimeSplit[0] > result.hourStartbreak
            ? result.breakTime
            : 0;
        workingTime = averageThreetimes;
      }
    }
  }
  return {
    breakTime,
    workingTime,
    totalTime,
    averageOnetime,
    averageTwotime,
    averageThreetimes,
  };
};
