import { cn } from "@/lib/utils";
import { Metadata } from "next";
import EventForm from "./EventForm";

export const metadata: Metadata = {
  title: "Ajouter un concours",
};

const page = () => {
  return (
    <>
      <h1>Ajouter un concours</h1>

      <section
        className={cn(
          "max-w-[600px] w-full mx-4 space-y-4",
          "md:max-w-[800px] md:w-1/2 md:mx-8"
        )}
      >
        <EventForm />
      </section>
    </>
  );
};

export default page;
