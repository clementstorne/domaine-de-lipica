import "../index.css";

import events from "../data/concours.json";

import EventCard from "./EventCard";

function NextEvents() {
  const nextEvents = events.slice(0, 3);
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

export default NextEvents;
