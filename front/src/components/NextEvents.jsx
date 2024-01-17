import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../store/eventSlice";

import { CardNextEvent, LinkButton } from "./index";

export default function NextEvents() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  const nextEvents = useSelector((state) => state.events.nextEvents);

  if (nextEvents.length === 0) {
    return <></>;
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
