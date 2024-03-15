import NavbarLink from "@/components/NavbarLink";
import { cn } from "@/lib/utils";
import { LinkItem } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration du site",
};

const page = () => {
  const carouselLinks: LinkItem[] = [
    {
      href: "/dashboard/images/",
      label: "Gérer les images",
    },
    {
      href: "/dashboard/images/ajouter",
      label: "Ajouter une image",
    },
  ];

  const eventLinks: LinkItem[] = [
    {
      href: "/dashboard/concours/",
      label: "Gérer les concours",
    },
    {
      href: "/dashboard/concours/ajouter",
      label: "Ajouter un concours",
    },
  ];

  const partnerLinks: LinkItem[] = [
    {
      href: "/dashboard/partenaires/",
      label: "Gérer les partenaires",
    },
    {
      href: "/dashboard/partenaires/ajouter",
      label: "Ajouter un partenaire",
    },
  ];

  const stableLinks: LinkItem[] = [
    {
      href: "/dashboard/ecuries/",
      label: "Gérer les écuries",
    },
    {
      href: "/dashboard/écuries/ajouter",
      label: "Ajouter une écurie",
    },
  ];

  return (
    <>
      <h1>Administration du site</h1>

      <section
        className={cn(
          "max-w-[600px] w-full mx-4 space-y-4 text-center",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-blue-900">Carousel</h2>

        <nav
          className={cn(
            "w-full flex flex-col items-center",
            "md:flex-row md:justify-around md:px-32"
          )}
        >
          {carouselLinks.map((link, index) => (
            <NavbarLink key={index} href={link.href} label={link.label} />
          ))}
        </nav>
      </section>

      <section
        className={cn(
          "max-w-[600px] w-full mx-4 space-y-4 text-center",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-blue-900">Concours</h2>

        <nav
          className={cn(
            "w-full flex flex-col items-center",
            "md:flex-row md:justify-around md:px-32"
          )}
        >
          {eventLinks.map((link, index) => (
            <NavbarLink key={index} href={link.href} label={link.label} />
          ))}
        </nav>
      </section>

      <section
        className={cn(
          "max-w-[600px] w-full mx-4 space-y-4 text-center",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-blue-900">Partenaires</h2>

        <nav
          className={cn(
            "w-full flex flex-col items-center",
            "md:flex-row md:justify-around md:px-32"
          )}
        >
          {partnerLinks.map((link, index) => (
            <NavbarLink key={index} href={link.href} label={link.label} />
          ))}
        </nav>
      </section>

      <section
        className={cn(
          "max-w-[600px] w-full mx-4 space-y-4 text-center",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-blue-900">Écuries</h2>

        <nav
          className={cn(
            "w-full flex flex-col items-center",
            "md:flex-row md:justify-around md:px-32"
          )}
        >
          {stableLinks.map((link, index) => (
            <NavbarLink key={index} href={link.href} label={link.label} />
          ))}
        </nav>
      </section>
    </>
  );
};

export default page;
