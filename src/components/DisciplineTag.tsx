import { DISCIPLINES } from "@/lib/const";
import { cn } from "@/lib/utils";
import { DisciplineCode } from "@/types";

type DisciplineTagProps = {
  code: DisciplineCode;
};

const DisciplineTag = ({ code }: DisciplineTagProps) => {
  const discipline = DISCIPLINES.filter(
    (discipline) => discipline.code === code
  )[0];

  return (
    <div
      className={cn(
        "flex h-5 w-20 items-center justify-center text-sm font-semibold text-gray-50 rounded-md",
        "md:h-6 md:w-24"
      )}
      style={{ backgroundColor: discipline.color, color: discipline.textColor }}
    >
      {discipline.name}
    </div>
  );
};

export default DisciplineTag;
