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
import { StableWithImages } from "@/types";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { deleteImages } from "./action";

type StableCardProps = StableWithImages;

const StableCard = ({
  id,
  nom,
  informations,
  url,
  images,
}: StableCardProps) => {
  const imagesList = images.map((image) => image.url);

  const delteStable = async () => {
    "use server";
    await prisma.stable.delete({ where: { id } });
    if (imagesList.length > 0) {
      deleteImages(imagesList);
    }
    revalidatePath("/dashboard/ecuries");
    revalidatePath("/ecuries");
  };

  return (
    <Card className="w-full text-center">
      <CardHeader>
        <CardTitle>{nom}</CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          "flex flex-col space-y-4 items-center",
          "md:grid md:grid-cols-3 md:gap-4"
        )}
      >
        <p
          className="md:col-span-2 text-left"
          dangerouslySetInnerHTML={{
            __html: newlineToBreakTag(informations),
          }}
        />
        <div className="grid gap-4 grid-cols-3 items-center">
          {images.map((image) => (
            <Image
              key={image.url}
              src={image.url}
              alt={"Image de présentation de " + nom}
              width={400}
              height={400}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <form className="flex space-x-4" action="">
          <Button asChild className="font-bold">
            <Link href={"/dashboard/ecuries/" + id}>Modifier</Link>
          </Button>
          <Button className="font-bold" formAction={delteStable}>
            Supprimer
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default StableCard;
