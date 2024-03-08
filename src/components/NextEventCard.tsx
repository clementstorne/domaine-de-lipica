import DisciplineTag from "@/components/DisciplineTag";
import { formatEventDates } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";
import { DisciplineCode } from "@/types";

type NextEventCardProps = {
  debut: string;
  fin: string;
  discipline: DisciplineCode;
  niveau: string;
};

const NextEventCard = ({
  debut,
  fin,
  discipline,
  niveau,
}: NextEventCardProps) => {
  return (
    <div
      className={cn(
        "h-52 p-4 flex flex-nowrap flex-col items-center justify-between rounded-md bg-gray-50 text-gray-950 text-center",
        "md:p-8 sm:max-w-80 md:h-80 "
      )}
    >
      <DisciplineTag code={discipline} />
      <h3>{niveau}</h3>
      <h4>{formatEventDates(debut, fin)}</h4>
    </div>
  );
};

export default NextEventCard;
