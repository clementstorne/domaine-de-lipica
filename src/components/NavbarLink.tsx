import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LinkItem } from "@/types";
import Link from "next/link";

type NavbarLinkProps = LinkItem & {
  className?: string;
};

const NavbarLink = ({ href, label, className }: NavbarLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "link" }),
        "uppercase font-semibold lg:text-lg",
        className
      )}
    >
      {label}
    </Link>
  );
};

export default NavbarLink;
