import { getStables } from "@/lib/stableData";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import StableCard from "./StableCard";

export const metadata: Metadata = {
  title: "Gérer les écuries",
};

const page = async () => {
  const stables = await getStables();

  return (
    <>
      <h1>Gérer les écuries</h1>

      <section
        className={cn(
          "max-w-[600px] mx-4 flex flex-wrap items-stretch justify-center gap-4",
          "md:max-w-max md:mx-8"
        )}
      ></section>

      <section
        className={cn("max-w-[600px] mx-4 space-y-4", "md:max-w-max md:mx-8")}
      >
        <div className="flex flex-col flex-wrap justify-center items gap-4">
          {stables.map((stable) => (
            <StableCard key={stable.id} {...stable} />
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
