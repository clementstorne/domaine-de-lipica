import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { newlineToBreakTag } from "@/lib/string";
import { cn } from "@/lib/utils";
import { Partner } from "@/types";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { deleteOldLogo } from "./action";

type PartnerCardProps = Partner;

const PartnerCard = ({ id, nom, logo, informations }: PartnerCardProps) => {
  const deletePartner = async () => {
    "use server";
    await prisma.partner.delete({ where: { id } });
    if (logo) {
      deleteOldLogo(logo);
    }
    revalidatePath("/dashboard/partenaires");
    revalidatePath("/partenaires");
  };

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
            <Image src={logo} alt={"Logo de " + nom} width={600} height={600} />
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

export default PartnerCard;
