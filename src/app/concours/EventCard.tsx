import DisciplineTag from "@/components/DisciplineTag";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { formatEventDates, isInFuture } from "@/lib/dateUtils";
import { Event } from "@/types";
import Link from "next/link";

type EventCardProps = Event;

const EventCard = ({
  id,
  debut,
  fin,
  discipline,
  niveau,
  horaires,
  lienWinJump,
}: EventCardProps) => {
  return (
    <Card className="min-w-56 basis-0 flex flex-col justify-center">
      <CardHeader className="flex flex-col items-center">
        <p className="text-center">{formatEventDates(debut, fin)}</p>
        <div className="md:flex md:flex-row md:flex-nowrap md:items-center md:justify-center">
          <DisciplineTag code={discipline} />
        </div>
        <p className="text-center">{niveau}</p>
      </CardHeader>
      <CardFooter className=" flex items-center justify-center space-x-4">
        {isInFuture(debut) ? (
          <Button
            asChild
            variant={!!horaires ? "default" : "disabled"}
            className="font-bold"
          >
            {horaires ? (
              <Link href={"/concours/" + id}>Horaires</Link>
            ) : (
              <span>Horaires</span>
            )}
          </Button>
        ) : (
          <></>
        )}

        {lienWinJump ? (
          <Button
            asChild
            variant={!!lienWinJump ? "default" : "disabled"}
            className="font-bold"
          >
            {lienWinJump ? (
              <Link href={"/concours/" + id}>
                {isInFuture(debut) ? "Live" : "Résultats"}
              </Link>
            ) : (
              <span>Live</span>
            )}
          </Button>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
