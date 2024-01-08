import { useEffect, useState } from "react";
import EventService from "../services/EventService";
import { filterFutureEvents, sortEvents } from "../utils/eventsUtils";

import CardNextEvent from "./CardNextEvent";
import LinkButton from "../layouts/LinkButton";

export default function NextEvents() {
  const [events, setEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await EventService.getAllEvents();
        setEvents(res.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFutureEvents(filterFutureEvents(sortEvents(events)));
    setNextEvents(futureEvents.slice(0, 3));
  }, [events, futureEvents]);

  if (events.length === 0 || isLoading) {
    return <p>Chargement…</p>;
  }
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
