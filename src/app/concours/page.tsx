import PartnersBanner from "@/components/PartnersBanner";
import { getFutureEvents, getPastEvents } from "@/lib/eventData";
import { getPartnersLogos } from "@/lib/partnerData";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import EventCard from "./EventCard";

export const metadata: Metadata = {
  title: "Concours",
};

const page = async () => {
  const partners = await getPartnersLogos();
  const futureEvents = await getFutureEvents();
  const pastEvents = await getPastEvents();

  return (
    <>
      <h1>Concours</h1>

      <PartnersBanner />

      {futureEvents.length !== 0 ? (
        <section
          className={cn("max-w-[600px] mx-4 space-y-4", "md:max-w-max md:mx-8")}
        >
          <h2 className="text-center text-blue-900">Concours à venir</h2>
          <div className="flex flex-wrap justify-center items gap-4">
            {futureEvents.map((event, index) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </section>
      ) : null}

      {pastEvents.length !== 0 ? (
        <section
          className={cn("max-w-[600px] mx-4 space-y-4", "md:max-w-max md:mx-8")}
        >
          <h2 className="text-center text-blue-900">Concours passés</h2>
          <div className="flex flex-wrap justify-center items gap-4">
            {pastEvents.map((event, index) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default page;
