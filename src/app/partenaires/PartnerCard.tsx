import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { newlineToBreakTag } from "@/lib/strUtils";
import { cn } from "@/lib/utils";
import { Partner } from "@/types";
import Image from "next/image";

type PartnerCardProps = Omit<Partner, "id">;

const PartnerCard = ({ nom, logo, informations }: PartnerCardProps) => {
  return (
    <Card className="w-80 text-center">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>{nom}</CardTitle>
        <div
          className={cn(
            "my-4 flex h-40 w-40 items-center justify-center",
            "md:mr-4",
            logo && "bg-white",
            !logo && "bg-gray-400"
          )}
        >
          {logo ? (
            <Image src={logo} alt={"Logo de " + nom} width={800} height={600} />
          ) : (
            <></>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p
          dangerouslySetInnerHTML={{
            __html: newlineToBreakTag(informations),
          }}
        />
      </CardContent>
    </Card>
  );
};

export default PartnerCard;
