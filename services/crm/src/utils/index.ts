export const startOfDate = (date: string) => {
  const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
  return new Date(dateset);
};

export const endOfDate = (date: string) => {
  const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
  return new Date(dateset);
};
