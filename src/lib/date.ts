const decomposeDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return { day, month, year };
};

export const dateToStringDate = (date: Date) => {
  const { day, month, year } = decomposeDate(date);
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};

const stringDateToDate = (stringDate: string) => {
  return new Date(stringDate);
};

export const isInFuture = (stringDate: string) => {
  const date = stringDateToDate(stringDate);
  const today = new Date();
  return date > today ? true : false;
};

const getMonthName = (month: number) => {
  switch (month) {
    case 1:
      return "janvier";
    case 2:
      return "février";
    case 3:
      return "mars";
    case 4:
      return "avril";
    case 5:
      return "mai";
    case 6:
      return "juin";
    case 7:
      return "juillet";
    case 8:
      return "août";
    case 9:
      return "septembre";
    case 10:
      return "octobre";
    case 11:
      return "novembre";
    case 12:
      return "décembre";
    default:
      break;
  }
};

export const formatEventDates = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const {
    day: startDay,
    month: startMonth,
    year: startYear,
  } = decomposeDate(startDate);
  const {
    day: endDay,
    month: endMonth,
    year: endYear,
  } = decomposeDate(endDate);

  if (startYear !== endYear) {
    return `${startDay} ${getMonthName(
      startMonth
    )} ${startYear} - ${endDay} ${getMonthName(endMonth)} ${endYear}`;
  } else if (startMonth !== endMonth) {
    return `${startDay} ${getMonthName(startMonth)} - ${endDay} ${getMonthName(
      endMonth
    )} ${endYear}`;
  } else if (startDay !== endDay) {
    return `${startDay}-${endDay} ${getMonthName(endMonth)} ${endYear}`;
  } else {
    return `${startDay} ${getMonthName(startMonth)} ${startYear}`;
  }
};

export const formatSingleEventDates = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const {
    day: startDay,
    month: startMonth,
    year: startYear,
  } = decomposeDate(startDate);
  const {
    day: endDay,
    month: endMonth,
    year: endYear,
  } = decomposeDate(endDate);

  if (startYear !== endYear) {
    return `du ${startDay} ${getMonthName(
      startMonth
    )} ${startYear} au ${endDay} ${getMonthName(endMonth)} ${endYear}`;
  } else if (startMonth !== endMonth) {
    return `du ${startDay} ${getMonthName(
      startMonth
    )} au ${endDay} ${getMonthName(endMonth)} ${endYear}`;
  } else if (startDay !== endDay) {
    return `du ${startDay} au ${endDay} ${getMonthName(endMonth)} ${endYear}`;
  } else {
    return `du ${startDay} ${getMonthName(startMonth)} ${startYear}`;
  }
};
