"use client";
import NavbarLink from "@/components/NavbarLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LinkItem, Stable } from "@/types";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../../public/logo-domaine-lipica.png";

type BurgerButtonProps = {
  className?: string;
  isOpen: boolean;
  onClick: () => void;
};

const BurgerButton = ({ className, isOpen, onClick }: BurgerButtonProps) => {
  return (
    <Button
      variant={"outline"}
      className={className}
      aria-label="Ouvrir le menu"
      onClick={onClick}
    >
      {isOpen ? <X /> : <Menu />}
    </Button>
  );
};

type NavbarProps = {
  stables: Omit<Stable, "id" | "informations">[];
};

const Navbar = ({ stables }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const links: LinkItem[] = [
    {
      href: "/",
      label: "Accueil",
    },
    {
      href: "/presentation",
      label: "Présentation",
    },
    {
      href: "/concours",
      label: "Concours",
    },
    {
      href: "/partenaires",
      label: "Partenaires",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];

  const stablesLinks = stables.map((stable) => {
    return { href: stable.url, label: stable.nom };
  });

  const smLinks = [...links];
  smLinks.splice(2, 0, ...stablesLinks);

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  useEffect(() => {
    const handleEscKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }

      if (e.key === "Escape" && isSubmenuOpen) {
        setIsSubmenuOpen(false);
      }
    };

    if (isOpen || isSubmenuOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen, isSubmenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 h-14 w-full flex justify-between items-center bg-white z-20",
        "lg:h-24 lg:pr-4"
      )}
    >
      <div
        className={cn(
          "w-full flex items-center justify-between",
          "lg:justify-normal"
        )}
      >
        <Link href="/">
          <Image
            src={logo}
            sizes="(min-width: 1120px) 102px, (min-width: 1040px) calc(98.33vw - 977px), 68px"
            alt="Logo du Domaine de Lipica, centre équestre à Ozoir la Ferrière"
            priority={true}
            className="w-auto h-14 lg:h-24"
          />
        </Link>

        <BurgerButton
          className="mr-4 lg:hidden"
          isOpen={isOpen}
          onClick={handleDrawer}
        />

        <nav
          className={cn(
            "hidden",
            "lg:w-full lg:flex lg:justify-between lg:items-center"
          )}
        >
          {links.slice(0, 2).map((link, index) => (
            <NavbarLink key={index} href={link.href} label={link.label} />
          ))}
          <div className="h-24 relative flex items-center">
            <Button
              variant={"link"}
              className="uppercase font-semibold lg:text-lg"
              onClick={handleSubmenu}
            >
              <span>Centre équestre</span>
              {isSubmenuOpen ? <ChevronUp /> : <ChevronDown />}
            </Button>
            <nav
              className={cn(
                "absolute top-24 left-1/2 -translate-x-1/2 bg-white z-0",
                "flex flex-col justify-center items-center space-y-4 py-8",
                "transform ease-in-out transition-all duration-300",
                isSubmenuOpen && "translate-y-0",
                !isSubmenuOpen && "-translate-y-[147%]"
              )}
            >
              {stablesLinks.map((link, index) => (
                <NavbarLink key={index} href={link.href} label={link.label} />
              ))}
            </nav>
          </div>
          {links.slice(2, 5).map((link, index) => (
            <NavbarLink key={index} href={link.href} label={link.label} />
          ))}
        </nav>
      </div>

      <nav
        className={cn(
          "w-full fixed top-14 left-0 bg-white overflow-auto",
          "flex flex-col justify-center items-center space-y-4 py-8",
          "transform ease-in-out transition-all duration-300",
          isOpen && "translate-x-0",
          !isOpen && "-translate-x-full"
        )}
      >
        {smLinks.map((link, index) => (
          <NavbarLink key={index} href={link.href} label={link.label} />
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
