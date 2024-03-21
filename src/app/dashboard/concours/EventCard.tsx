import DisciplineTag from "@/components/DisciplineTag";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { formatEventDates } from "@/lib/date";
import prisma from "@/lib/prisma";
import { Event } from "@/types";
import { revalidatePath } from "next/cache";
import Link from "next/link";

type EventCardProps = Omit<Event, "horaires" | "lienWinJump">;

const EventCard = ({ id, debut, fin, discipline, niveau }: EventCardProps) => {
  const deletePartner = async () => {
    "use server";
    await prisma.event.delete({ where: { id } });
    revalidatePath("/dashboard/concours");
    revalidatePath("/concours");
    revalidatePath("/");
  };

  return (
    <Card className="min-w-56 basis-0 flex flex-col justify-center">
      <CardHeader className="flex flex-col items-center">
        <p className="text-center">{formatEventDates(debut, fin)}</p>
        <div className="md:flex md:flex-row md:flex-nowrap md:items-center md:justify-center">
          <DisciplineTag code={discipline} />
        </div>
        <p className="text-center">{niveau}</p>
      </CardHeader>
      <CardFooter className="flex flex-col space-y-4">
        <form className="flex flex-col space-y-4" action="">
          <Button asChild className="font-bold">
            <Link href={"/dashboard/partenaires/" + id}>Modifier</Link>
          </Button>
          <Button className="font-bold" formAction={deletePartner}>
            Supprimer
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
