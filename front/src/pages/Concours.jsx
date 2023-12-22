import events from "../data/concours.json";

import { isInFuture } from "../utils/dateUtils";

import Footer from "../layouts/Footer";
import EventCard from "../layouts/EventCard";

export default function Concours() {
  const futureEvents = events.filter((event) => isInFuture(event.debut));
  const futureEventsSorted = futureEvents.sort((a, b) =>
    a.debut < b.debut ? -1 : a.debut > b.debut ? 1 : 0
  );

  const pastEvents = events.filter((event) => !isInFuture(event.debut));
  const pastEventsSorted = pastEvents.sort((a, b) =>
    a.debut < b.debut ? 1 : a.debut > b.debut ? -1 : 0
  );

  return (
    <>
      <h1>Concours</h1>
      <section className="mb-8 md:mb-16">
        <h2 className="text-blue-900">Concours à venir</h2>

        <div className="table-header blue-gradient">
          <p>Dates</p>
          <p>Discipline</p>
          <p>Niveau</p>
          <p>Liens</p>
        </div>
        {futureEventsSorted.map((event, index) => (
          <EventCard
            key={event.id}
            {...event}
            className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}
          />
        ))}
      </section>
      <section className="mb-8 md:mb-16">
        <h2 className="text-blue-900">Concours passés</h2>
        <div className="table-header blue-gradient">
          <p>Dates</p>
          <p>Discipline</p>
          <p>Niveau</p>
          <p>Liens</p>
        </div>
        {pastEventsSorted.map((event, index) => (
          <EventCard
            key={event.id}
            {...event}
            className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}
          />
        ))}
      </section>

      <Footer />
    </>
  );
}
