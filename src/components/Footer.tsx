import NavbarLink from "@/components/NavbarLink";
import { cn } from "@/lib/utils";
import { LinkItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo-domaine-lipica.png";

const Footer = () => {
  const links: LinkItem[] = [
    {
      href: "/mentions-legales",
      label: "Mentions légales",
    },
    {
      href: "/plan-du-site",
      label: "Plan du site",
    },
    {
      href: "/administration/login",
      label: "Administration",
    },
  ];

  return (
    <footer
      className={cn(
        "relative w-full py-4 bg-white flex flexitems-center",
        "md:h-24 md:py-0"
      )}
    >
      <Link href="/">
        <Image
          src={logo}
          sizes="(min-width: 1120px) 102px, (min-width: 1040px) calc(98.33vw - 977px), 68px"
          alt="Logo du Domaine de Lipica, centre équestre à Ozoir la Ferrière"
          priority={true}
          className="absolute left-0 bottom-0 w-auto h-14 lg:h-24"
        />
      </Link>
      <nav
        className={cn(
          "w-full flex flex-col items-center",
          "md:flex-row md:justify-around md:px-32"
        )}
      >
        {links.map((link, index) => (
          <NavbarLink
            key={index}
            href={link.href}
            label={link.label}
            className={cn("h-auto py-0", "md:h-9 md:py-2")}
          />
        ))}
      </nav>
      <div
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 mr-4 flex flex-col items-center",
          "text-blue-900 uppercase text-center text-[8px] leading-3"
        )}
      >
        <span className="block m-0">Designed by </span>
        <a
          href="https://clementstorne.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-medium md:text-md-sm"
        >
          Clément <br />
          Storne
        </a>

        <span className="block m-0 font-light normal-case">© 2024</span>
      </div>
    </footer>
  );
};

export default Footer;
