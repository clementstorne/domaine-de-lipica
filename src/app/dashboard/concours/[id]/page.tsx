import { getSingleEvent } from "@/lib/data";
import { formatSingleEventDates } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";
import { Event } from "@/types";
import { redirect } from "next/navigation";
import EventForm from "./EventForm";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const event = await getSingleEvent(params.id);

  if (!event) {
    redirect("/dashboard/concours");
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

  const timeTable = event.horaires
    .split("\n\n")
    .map((schedule) => schedule.split("\n").join("<br />"));

  return (
    <>
      <h1>{formatTitle(event)}</h1>

      <section
        className={cn(
          "max-w-[600px] w-full mx-4 space-y-4",
          "md:max-w-[800px] md:w-1/2 md:mx-8"
        )}
      >
        <EventForm {...event} />
      </section>
    </>
  );
};

export default page;
