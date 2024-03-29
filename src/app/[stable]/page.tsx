import CarouselPlugin from "@/components/CarouselPlugin";
import { CarouselItem } from "@/components/ui/carousel";
import { getSingleStableByUrl, getStableName } from "@/lib/stableData";
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
  const stable = await getSingleStableByUrl(params.stable);

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
          "max-w-[600px] mx-4 space-y-4 flex flex-col items-center",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        {informations.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: `${paragraph}` }} />
        ))}

        <div className="px-8">
          <CarouselPlugin>
            {stable.images.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image.url}
                  alt={`Images de présentation de ${stable.nom}`}
                  width={100}
                  height={100}
                  sizes="(min-width: 940px) 736px, (min-width: 780px) calc(60vw + 184px), (min-width: 680px) 536px, calc(92.22vw - 73px)"
                  priority={true}
                  placeholder={"blur"}
                  blurDataURL={image.url}
                  style={{ objectFit: "contain" }}
                  className={cn("w-full h-full object-contain object-right")}
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
