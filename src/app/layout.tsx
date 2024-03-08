import Navbar from "@/components/Navbar";
import { getStablesForNavbar } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  weight: ["300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Domaine de Lipica, Centre équestre à Ozoir la Ferrière - %s",
    default: "Domaine de Lipica, Centre équestre à Ozoir la Ferrière - Accueil",
  },
  description:
    "Dans un cadre verdoyant a 25 km a l'Est de Paris, le Domaine de Lipica vous accueille dans ses installations reservees a la pratique de l'equitation",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const stables = await getStablesForNavbar();

  return (
    <html lang="fr">
      <body className={cn(exo2.className, "bg-gray-50")}>
        <Navbar stables={stables} />
        <main
          className={cn(
            "mt-14 mb-8 space-y-8 flex flex-col items-center",
            "md:mb-16 md:space-y-16 lg:mt-24"
          )}
        >
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
