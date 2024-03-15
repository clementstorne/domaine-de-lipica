import PartnerLogo from "@/components/PartnerLogo";
import { Card, CardContent } from "@/components/ui/card";
import { getPartnersLogos, getSingleEvent } from "@/lib/data";
import { formatSingleEventDates } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";
import { Event } from "@/types";
import { redirect } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const event = await getSingleEvent(params.id);

  if (!event) {
    redirect("/concours");
  }

  return {
    title: `${event.discipline.toUpperCase()} ${
      event.niveau
    } ${formatSingleEventDates(event.debut, event.fin)}`,
  };
};

const formatTitle = (event: Omit<Event, "lienWinJump">) => {
  return `${event.discipline} ${event.niveau} ${formatSingleEventDates(
    event.debut,
    event.fin
  )}`;
};

const page = async ({ params }: { params: { id: string } }) => {
  const event = await getSingleEvent(params.id);

  if (!event) {
    redirect("/concours");
  }

  const partners = await getPartnersLogos();

  const timeTable = event.horaires
    .split("\n\n")
    .map((schedule) => schedule.split("\n").join("<br />"));

  return (
    <>
      <h1>{formatTitle(event)}</h1>

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

      <Card
        className={cn(
          "max-w-[600px] mx-4 space-y-4 font-semibold",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <CardContent className="pt-6 space-y-4">
          <p>
            Pour tout changement de cavalier, merci d&apos;amener la licence
            compétition, ou un duplicata internet, ou une fiche licence
            internet.
          </p>
          <p>
            Afin que les épreuves puissent commencer à l&apos;heure, nous
            demandons aux cavaliers passant en début d&apos;épreuve de détendre
            AVANT la reconnaissance.
          </p>
        </CardContent>
      </Card>

      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-center text-blue-900">
          Horaires approximatifs de début d&apos;épreuve
        </h2>
        {timeTable.map((text, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: `${text}` }} />
        ))}
      </section>

      <Card
        className={cn(
          "max-w-[600px] mx-4 space-y-4 font-semibold",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <CardContent className="pt-6 space-y-4">
          <p>
            Afin d&apos;accueillir tous les concurrents dans les meilleures
            conditions possibles, aucune voiture ne pourra accéder au parking
            camions-vans. Merci de prendre vos dispositions pour le matériel.
          </p>
          <p>Restaurant et buvette ouverts toute la journée.</p>
        </CardContent>
      </Card>
    </>
  );
};

export default page;
