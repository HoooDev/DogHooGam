export function transString(year, month, day) {
  return `${year}.${month}. ${day}`;
}

const splitDate = (target) => {
  const result = String(target).split(".");
  return result;
};

const CalcDate = (start, end) => {
  // console.log("end", end);
  const returnYMD = (ymd) => {
    const now = new Date(ymd);
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    return [year, month, date];
  };

  const pattern = /^(19|20)\d{2}.(0[1-9]|1[012]).(0[1-9]|[12][0-9]|3[0-1])$/;

  const result = [];
  let startDate = splitDate(start);
  let endDate = splitDate(end);

  startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
  endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);

  if (pattern.test(end) === false || startDate >= endDate) {
    return [];
  }

  while (startDate.getTime() <= endDate.getTime()) {
    const ans = returnYMD(returnYMD(startDate));

    result.push(transString(ans[0], ans[1], ans[2]));
    startDate.setDate(startDate.getDate() + 1);
  }

  return result;
};

export default CalcDate;
