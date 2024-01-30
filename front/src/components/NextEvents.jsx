import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
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
    <section className="flex flex-col items-center justify-center p-4 mx-4 lg:max-w-214 blue-gradient flex-nowrap rounded-10 text-gray-50 md:mx-12 md:p-12 lg:mx-auto">
      <h2>Prochains concours</h2>
      <div className="flex flex-col items-center w-full gap-4 flex-nowrap sm:flex-row sm:justify-between">
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
