import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { CarouselImage } from "@/types";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { deleteImageFile } from "./action";

type ImageCardProps = CarouselImage;

const ImageCard = ({ id, url, alt, title }: ImageCardProps) => {
  const deleteImage = async () => {
    "use server";
    await prisma.carousel.delete({ where: { id } });
    deleteImageFile(url);
    revalidatePath("/dashboard/ecuries");
    revalidatePath("/ecuries");
  };

  return (
    <Card className="w-80 text-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image key={id} src={url} width={400} height={400} alt={alt} />
        <p>{alt}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <form className="flex space-x-4" action="">
          <Button asChild className="font-bold">
            <Link href={"/dashboard/images/" + id}>Modifier</Link>
          </Button>
          <Button className="font-bold" formAction={deleteImage}>
            Supprimer
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
