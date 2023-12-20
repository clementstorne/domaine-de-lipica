import moment from "moment/min/moment-with-locales";

moment.locale("fr");

const formatDate = (dateStr) => {
  return moment(dateStr).format("DD/MM/YYYY");
};

const isInFuture = (dateStr) => {
  return moment(dateStr).diff(moment(), "days") >= 0;
};

const eventDates = (debut, fin) => {
  const dateDebut = moment(debut);
  const dateFin = moment(fin);
  if (dateDebut.diff(dateFin, "days") === 0) {
    return dateDebut.format("D MMMM YYYY");
  } else if (dateDebut.month() === dateFin.month()) {
    return `${dateDebut.format("D")}-${dateFin.format("D MMMM YYYY")}`;
  } else {
    return `${dateDebut.format("D MMMM")} - ${dateFin.format("D MMMM YYYY")}`;
  }
};

export { formatDate, isInFuture, eventDates };
