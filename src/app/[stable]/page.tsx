import CarouselPlugin from "@/components/CarouselPlugin";
import { CarouselItem } from "@/components/ui/carousel";
import { getSingleStable, getStableName } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: { stable: string };
}) => {
  const stable = await getStableName(params.stable);

  if (!stable) {
    redirect("/");
  }

  return {
    title: stable.nom,
  };
};

const page = async ({ params }: { params: { stable: string } }) => {
  const stable = await getSingleStable(params.stable);

  if (!stable) {
    redirect("/");
  }

  const informations = stable.informations
    .split("\n\n")
    .map((schedule) => schedule.split("\n").join("<br />"));

  return (
    <>
      <h1>{stable.nom}</h1>

      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        {informations.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: `${paragraph}` }} />
        ))}

        <div className="w-3/4 m-auto">
          <CarouselPlugin>
            {stable.images.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image.url}
                  alt={`Images de présentation de ${stable.nom}`}
                  width={600}
                  height={100}
                  sizes="584px"
                  priority={true}
                  className="object-cover object-center"
                />
              </CarouselItem>
            ))}
          </CarouselPlugin>
        </div>
      </section>
    </>
  );
};

export default page;
