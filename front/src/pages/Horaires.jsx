import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleEvent } from "../store/eventSlice";
import { getAllPartners } from "../store/partnerSlice";

import { ErrorPage } from "./index";
import { Footer, Navbar } from "../components/index";

import { singleEventDates } from "../utils/dateUtils";

export default function Horaires() {
  const dispatch = useDispatch();
  const { concoursId } = useParams();

  useEffect(() => {
    dispatch(getSingleEvent({ id: concoursId }));
    dispatch(getAllPartners());
  }, []);

  const event = useSelector((state) => state.events.event);
  const eventError = useSelector((state) => state.events.error);
  const partners = useSelector((state) => state.partners.partnersList);
  const partnersError = useSelector((state) => state.partners.error);

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

  if (eventError || partnersError) {
    return <ErrorPage />;
  }
  return (
    <>
      <Navbar />
      <h1>{title}</h1>

      <div className="m-4 flex  flex-row flex-wrap justify-center md:m-16">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="mb-2 mr-2 flex h-12 w-12 items-center justify-center bg-white md:mb-4 md:mr-4 md:h-24 md:w-24"
          >
            <img
              src={partner.logo}
              alt={`Logo de ${partner.nom}`}
              className="object-fill"
            />
          </div>
        ))}
      </div>

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

      <Footer />
    </>
  );
}
