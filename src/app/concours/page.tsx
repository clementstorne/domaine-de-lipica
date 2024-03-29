import PartnerLogo from "@/components/PartnerLogo";
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

      <section
        className={cn(
          "max-w-[600px] mx-4 flex flex-wrap items-stretch justify-center gap-4",
          "md:max-w-max md:mx-8"
        )}
      >
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {partners.map((partner) => (
            <PartnerLogo
              key={partner.id}
              nom={partner.nom}
              logo={partner.logo}
            />
          ))}
        </div>
      </section>

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
    </>
  );
};

export default page;
