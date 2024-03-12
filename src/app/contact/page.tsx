import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

const page = () => {
  return (
    <>
      <h1>Contact</h1>

      <section
        className={cn(
          "max-w-[600px] w-full mx-4 space-y-4 text-center",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-blue-900">Nos coordonnées</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629.7378841376913!2d2.65571291199896!3d48.76780167120043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6067616a76f11%3A0x2f71376656ba1dba!2sDomaine%20de%20Lipica!5e0!3m2!1sfr!2sfr!4v1703759070377!5m2!1sfr!2sfr"
          className="w-full aspect-4/3 px-4 md:px-8"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div
          className={cn(
            "mx-4 flex flex-col items-center gap-4",
            "md:mx-8 md:flex-row md:justify-around"
          )}
        >
          <Card>
            <CardHeader>
              <h3>Domaine de Lipica</h3>
            </CardHeader>
            <CardContent>
              <p>
                1, rond-point du Manège <br />
                77330 OZOIR-LA-FERRIÈRE
              </p>
            </CardContent>
          </Card>

          <div>
            <h3>Coordonnées GPS</h3>
            <p>
              48°45&apos;57.00&quot; N <br /> 2°39&apos;39.95&quot; E
            </p>
          </div>
        </div>
      </section>

      <section
        className={cn(
          "max-w-[600px] w-full mx-4 space-y-4",
          "md:max-w-[800px] md:w-1/2 md:mx-8"
        )}
      >
        <h2 className="text-center text-blue-900">Contactez-nous</h2>
        <ContactForm />
      </section>
    </>
  );
};

export default page;
