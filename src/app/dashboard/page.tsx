import NavbarLink from "@/components/NavbarLink";
import { cn } from "@/lib/utils";
import { LinkItem } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration du site",
};

const page = () => {
  const mainLinks: LinkItem[] = [
    {
      href: "/dashboard/images/",
      label: "Gérer les images",
    },
    {
      href: "/dashboard/images/add",
      label: "Ajouter une image",
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
          {mainLinks.map((link, index) => (
            <NavbarLink key={index} href={link.href} label={link.label} />
          ))}
        </nav>
      </section>
    </>
  );
};

export default page;
