import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../store/eventSlice";
import { getAllPartners } from "../store/partnerSlice";

import { PartnersGrid } from "../components/index";
import { ErrorPage } from "./index";

import { singleEventDates } from "../utils/dateUtils";

export default function Horaires() {
  const dispatch = useDispatch();
  const { concoursId } = useParams();

  useEffect(() => {
    dispatch(getSingleEvent({ id: concoursId }));
    dispatch(getAllPartners());
  }, []);

  const event = useSelector((state) => state.events.event);
  const error = useSelector((state) => state.events.error);

  const title = event
    ? `${event.discipline} ${event.niveau} ${singleEventDates(
        event.debut,
        event.fin,
      )}`
    : "";
  const schedules = event
    ? event.horaires
        .split("\n\n")
        .map((schedule) => schedule.split("\n").join("<br />"))
    : "";

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <h1>{title}</h1>

      <PartnersGrid />

      <section className="bloc">
        <p className="mb-4">
          Pour tout changement de cavalier, merci d&apos;amener la licence
          compétition, ou un duplicata internet, ou une fiche licence internet.
        </p>
        <p>
          Afin que les épreuves puissent commencer à l&apos;heure, nous
          demandons aux cavaliers passant en début d&apos;épreuve de détendre
          AVANT la reconnaissance.
        </p>
      </section>

      <main>
        <h2 className="text-blue-900">
          Horaires approximatifs de début d&apos;épreuve
        </h2>
        {event &&
          schedules.map((schedule, index) => (
            <p
              key={index}
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: `${schedule}` }}
            />
          ))}
      </main>

      <section className="bloc">
        <p className="mb-4">
          Afin d&apos;accueillir tous les concurrents dans les meilleures
          conditions possibles, aucune voiture ne pourra accéder au parking
          camions-vans. Merci de prendre vos dispositions pour le matériel.
        </p>
        <p>Restaurant et buvette ouverts toute la journée.</p>
      </section>
    </>
  );
}
