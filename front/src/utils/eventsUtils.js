import { isInFuture } from "./dateUtils";

const filterFutureEvents = (events) => {
  return events.filter((event) => isInFuture(event.debut));
};

const filterPastEvents = (events) => {
  return events.filter((event) => !isInFuture(event.debut));
};

const sortEvents = (events) => {
  return events.sort((a, b) =>
    a.debut < b.debut ? -1 : a.debut > b.debut ? 1 : 0,
  );
};

export { filterFutureEvents, filterPastEvents, sortEvents };
