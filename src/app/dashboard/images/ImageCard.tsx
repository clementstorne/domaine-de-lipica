import CloudinaryImage from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteImage } from "@/lib/actions/cloudinary/deleteImage";
import prisma from "@/lib/prisma";
import { CarouselImage } from "@/types";
import { revalidatePath } from "next/cache";
import Link from "next/link";

type ImageCardProps = CarouselImage;

const ImageCard = ({ id, url, alt, title }: ImageCardProps) => {
  const deleteCarouselImage = async () => {
    "use server";
    await prisma.carousel.delete({ where: { id } });
    deleteImage(url);
    revalidatePath("/dashboard/ecuries");
    revalidatePath("/ecuries");
  };

  return (
    <Card className="w-80 text-center flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CloudinaryImage id={url} alt={alt} size={400} />
        <p>{alt}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <form className="flex space-x-4" action="">
          <Button asChild className="font-bold">
            <Link href={"/dashboard/images/" + id}>Modifier</Link>
          </Button>
          <Button className="font-bold" formAction={deleteCarouselImage}>
            Supprimer
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
