import events from "../data/concours.json";

import CardNextEvent from "./CardNextEvent";
import LinkButton from "../layouts/LinkButton";

import { isInFuture } from "../utils/dateUtils";

export default function NextEvents() {
  const futureEvents = events.filter((event) => isInFuture(event.debut));
  const futureEventsSorted = futureEvents.sort((a, b) =>
    a.debut < b.debut ? -1 : a.debut > b.debut ? 1 : 0,
  );
  const nextEvents = futureEventsSorted.slice(0, 3);
  return (
    <section className="home-section blue-gradient">
      <h2>Prochains concours</h2>
      <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
        {nextEvents.map((event) => (
          <CardNextEvent
            key={event.id}
            debut={event.debut}
            fin={event.fin}
            discipline={event.discipline}
            niveau={event.niveau}
          />
        ))}
      </div>
      <LinkButton
        link={"/concours"}
        label="Voir tous les concours à venir"
        className="mt-4 md:mt-8"
      />
    </section>
  );
}
