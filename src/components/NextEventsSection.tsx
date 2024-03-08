import { getNextEvents } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Event } from "@/types";
import Link from "next/link";
import NextEventCard from "./NextEventCard";
import { buttonVariants } from "./ui/button";

const NextEventsSection = async () => {
  const nextEvents = (await getNextEvents()) as Omit<
    Event,
    "id" | "horaires" | "lienWinJump"
  >[];

  if (nextEvents.length === 0) {
    return <></>;
  }
  return (
    <section
      className={cn(
        "px-4 py-8 max-w-[600px] mx-4 space-y-8 flex flex-nowrap flex-col items-center justify-center rounded-lg bg-blue-gradient text-gray-50",
        "md:max-w-[800px] md:p-12 md:mx-8"
      )}
    >
      <h2 className="text-center">Prochains concours</h2>
      <div
        className={cn(
          "w-full flex flex-col items-center space-y-4 flex-nowrap",
          "md:flex-row md:space-x-4 md:space-y-0"
        )}
      >
        {nextEvents.map((event, index) => (
          <NextEventCard
            key={index}
            debut={event.debut}
            fin={event.fin}
            discipline={event.discipline}
            niveau={event.niveau}
          />
        ))}
      </div>
      <Link
        href="/concours"
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "font-bold"
        )}
      >
        Voir tous les concours à venir
      </Link>
    </section>
  );
};

export default NextEventsSection;
