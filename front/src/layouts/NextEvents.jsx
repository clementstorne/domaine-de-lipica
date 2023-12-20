import "../index.css";

import events from "../data/concours.json";

import EventCard from "./EventCard";

import { isInFuture } from "../utils/dateUtils";

export default function NextEvents() {
  const futureEvents = events.filter((event) => isInFuture(event.debut));
  const futureEventsSorted = futureEvents.sort((a, b) =>
    a.debut < b.debut ? -1 : a.debut > b.debut ? 1 : 0
  );
  const nextEvents = futureEventsSorted.slice(0, 3);
  return (
    <section className="home-section blue-gradient">
      <h2>Prochains concours</h2>
      {nextEvents.map((event) => (
        <EventCard
          key={event.id}
          debut={event.debut}
          fin={event.fin}
          discipline={event.discipline}
          niveau={event.niveau}
        />
      ))}
    </section>
  );
}