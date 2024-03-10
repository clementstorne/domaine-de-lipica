import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LinkItem } from "@/types";
import Link from "next/link";

type NavbarLinkProps = LinkItem & {
  className?: string;
  target?: string;
  rel?: string;
};

const NavbarLink = ({
  href,
  label,
  className,
  target,
  rel,
}: NavbarLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "link" }),
        "uppercase font-semibold lg:text-lg",
        className
      )}
      target={target}
      rel={rel}
    >
      {label}
    </Link>
  );
};

export default NavbarLink;
