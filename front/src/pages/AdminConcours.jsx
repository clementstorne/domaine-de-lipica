import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../store/eventSlice";

import Navbar from "../layouts/Navbar";
import CardEvent from "../components/CardEvent";
import Footer from "../layouts/Footer";

import { useEffect } from "react";

export default function AdminConcours() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  const pastEvents = useSelector((state) => state.events.pastEventsList);
  const futureEvents = useSelector((state) => state.events.futureEventsList);

  return (
    <>
      <Navbar />
      <h1>Liste des concours</h1>
      {futureEvents.length === 0 ? (
        <></>
      ) : (
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
      )}
      {pastEvents.length === 0 ? (
        <></>
      ) : (
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
      )}

      <Footer />
    </>
  );
}
