import NavbarLink from "@/components/NavbarLink";
import { getStablesForNavbar } from "@/lib/data";
import { cn } from "@/lib/utils";
import { LinkItem } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan du site",
};

const page = async () => {
  const stables = await getStablesForNavbar();

  const mainLinks: LinkItem[] = [
    {
      href: "/",
      label: "Accueil",
    },
    {
      href: "/presentation",
      label: "Présentation",
    },
    {
      href: "/contact",
      label: "Contact",
    },
    {
      href: "/partenaires",
      label: "Partenaires",
    },
    {
      href: "/mentions-legales",
      label: "Mentions légales",
    },
  ];

  const competitionsLink: LinkItem[] = [
    {
      href: "/concours",
      label: "Liste des concours",
    },
  ];

  return (
    <>
      <h1>Plan du site</h1>

      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-center text-blue-900">Domaine de Lipica</h2>
        <nav
          className={cn(
            "w-full flex flex-col items-center",
            "md:flex-row md:justify-around md:px-32"
          )}
        >
          {mainLinks.map((link, index) => (
            <NavbarLink key={index} href={link.href} label={link.label} />
          ))}
        </nav>
      </section>

      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-center text-blue-900">Centre équestre</h2>
        <nav
          className={cn(
            "w-full flex flex-col items-center",
            "md:flex-row md:justify-around md:px-32"
          )}
        >
          {stables.map((stable, index) => (
            <NavbarLink key={index} href={stable.url} label={stable.nom} />
          ))}
        </nav>
      </section>

      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-center text-blue-900">Concours</h2>
        <nav
          className={cn(
            "w-full flex flex-col items-center",
            "md:flex-row md:justify-around"
          )}
        >
          {competitionsLink.map((link, index) => (
            <NavbarLink key={index} href={link.href} label={link.label} />
          ))}
          <NavbarLink
            href="https://ozoir.winjump.fr/"
            label="Engagés et résultats"
            target="_blank"
            rel="noopener noreferrer"
          />
        </nav>
      </section>
    </>
  );
};

export default page;
