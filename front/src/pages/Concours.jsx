import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../store/eventSlice";

import { CardConcours, PartnersGrid } from "../components/index";
import { ErrorPage } from "./index";

export default function Concours() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  const pastEvents = useSelector((state) => state.events.pastEventsList);
  const futureEvents = useSelector((state) => state.events.futureEventsList);
  const error = useSelector((state) => state.events.error);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <h1>Concours</h1>
      <PartnersGrid />
      {futureEvents.length === 0 ? (
        <></>
      ) : (
        <section>
          <h2 className="text-blue-900">Concours à venir</h2>

          <div className="table-header blue-gradient">
            <p>Dates</p>
            <p>Discipline</p>
            <p>Niveau</p>
            <p>Liens</p>
          </div>
          {futureEvents.map((event, index) => (
            <CardConcours
              key={event.id}
              {...event}
              className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}
            />
          ))}
        </section>
      )}
      {pastEvents.length === 0 ? (
        <></>
      ) : (
        <section>
          <h2 className="text-blue-900">Concours passés</h2>
          <div className="table-header blue-gradient">
            <p>Dates</p>
            <p>Discipline</p>
            <p>Niveau</p>
            <p>Liens</p>
          </div>
          {pastEvents.map((event, index) => (
            <CardConcours
              key={event.id}
              {...event}
              className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}
            />
          ))}
        </section>
      )}
    </>
  );
}
