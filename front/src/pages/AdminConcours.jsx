import {
  filterFutureEvents,
  filterPastEvents,
  sortEvents,
} from "../utils/eventsUtils";

import Navbar from "../layouts/Navbar";
import CardEvent from "../components/CardEvent";
import Footer from "../layouts/Footer";

import EventService from "../services/EventService";
import { useEffect, useState } from "react";

export default function AdminConcours() {
  const [events, setEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
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
    setPastEvents(sortEvents(filterPastEvents(events)));
  }, [events]);

  if (events.length === 0 || isLoading) {
    return <p>Chargement…</p>;
  }
  return (
    <>
      <Navbar />
      <h1>Liste des concours</h1>
      <section className="mb-8 md:mb-16">
        <h2 className="text-blue-900">Concours à venir</h2>

        <div className="table-header blue-gradient">
          <p>Dates</p>
          <p>Discipline</p>
          <p>Niveau</p>
          <p>Actions</p>
        </div>
        {futureEvents.map((event, index) => (
          <CardEvent
            key={event.id}
            {...event}
            admin={true}
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
          <p>Actions</p>
        </div>
        {pastEvents.map((event, index) => (
          <CardEvent
            key={event.id}
            {...event}
            admin={true}
            className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}
          />
        ))}
      </section>

      <Footer />
    </>
  );
}
