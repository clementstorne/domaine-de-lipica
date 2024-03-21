import { DateTime } from "luxon";

export const formatDate = (dateStr: string) => {
  return DateTime.fromISO(dateStr).setLocale("fr").toFormat("dd/LL/yyyy");
};

export const isInFuture = (dateStr: string) => {
  const daysFromNow = DateTime.fromISO(dateStr)
    .diff(DateTime.now(), "days")
    .toObject();
  return daysFromNow.days ? daysFromNow.days > -1 : null;
};

export const todayToISO = () => {
  return DateTime.now().toISO().split("T")[0];
};

export const daysBetweenTwoDates = (date1: string, date2: string) => {
  const numberOfDays = DateTime.fromISO(date1)
    .diff(DateTime.fromISO(date2), "days")
    .toObject();
  return numberOfDays.days;
};

export const sameMonth = (date1: string, date2: string) => {
  const monthDate1 = DateTime.fromISO(date1).month;
  const monthDate2 = DateTime.fromISO(date2).month;
  return monthDate1 === monthDate2;
};

export const formatEventDates = (start: string, finish: string) => {
  if (daysBetweenTwoDates(start, finish) === 0) {
    return DateTime.fromISO(start).setLocale("fr").toFormat("d LLLL yyyy");
  } else if (sameMonth(start, finish)) {
    return `${DateTime.fromISO(start)
      .setLocale("fr")
      .toFormat("d")} - ${DateTime.fromISO(finish)
      .setLocale("fr")
      .toFormat("d LLLL yyyy")}`;
  } else {
    return `${DateTime.fromISO(start)
      .setLocale("fr")
      .toFormat("d LLLL")} - ${DateTime.fromISO(finish)
      .setLocale("fr")
      .toFormat("d LLLL yyyy")}`;
  }
};

export const formatSingleEventDates = (start: string, finish: string) => {
  if (daysBetweenTwoDates(start, finish) === 0) {
    return `du ${DateTime.fromISO(start)
      .setLocale("fr")
      .toFormat("d LLLL yyyy")}`;
  } else if (sameMonth(start, finish)) {
    return `du ${DateTime.fromISO(start)
      .setLocale("fr")
      .toFormat("d")} au ${DateTime.fromISO(finish)
      .setLocale("fr")
      .toFormat("d LLLL yyyy")}`;
  } else {
    return `du ${DateTime.fromISO(start)
      .setLocale("fr")
      .toFormat("d LLLL")} au ${DateTime.fromISO(finish)
      .setLocale("fr")
      .toFormat("d LLLL yyyy")}`;
  }
};
