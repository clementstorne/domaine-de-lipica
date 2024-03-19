import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
};

const page = () => {
  return (
    <>
      <h1>Mentions légales</h1>

      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <p>
          Conformément aux dispositions des Articles 6-III et 19 de la Loi
          n°2004-575 du 21 juin 2004 pour la Confiance dans l&apos;économie
          numérique, dite L.C.E.N., il est porté à la connaissance des
          utilisateurs et visiteurs, ci-après l&apos;
          <em>Utilisateur</em>, du site{" "}
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "link" }), "p-0 h-auto")}
          >
            www.ozoir-equitation.com
          </Link>
          , ci-après le <em>Site</em>, les présentes mentions légales.
        </p>
        <p>
          La connexion et la navigation sur le <em>Site</em> par l&apos;
          <em>Utilisateur</em> implique acceptation intégrale et sans réserve
          des présentes mentions légales.
        </p>
        <p>
          Ces dernières sont accessibles sur le <em>Site</em> à la rubrique{" "}
          <Link
            href="/mentions-legales"
            className={cn(buttonVariants({ variant: "link" }), "p-0 h-auto")}
          >
            Mentions légales
          </Link>
        </p>
      </section>

      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-center text-blue-900">
          Article 1 - L&apos;éditeur
        </h2>
        <p>
          L&apos;édition du Site est assurée par{" "}
          <strong>ACE Sport Jumping Ile-de-France</strong>, association loi
          1901, immatriculée au Registre du Commerce et des Sociétés de MEAUX
          sous le numéro 513558072 dont le siège social est situé au 1,
          rond-point du Manège - 77330 OZOIR-LA-FERRIÈRE.
          <br />
          Numéro de téléphone : <a href="tel:+33688167937">06 88 16 79 37</a>
          <br />
          Adresse mail :{" "}
          <a href="mailto:info@ozoir-equitation.com">
            info@ozoir-equitation.com
          </a>
          <br />
          Numéro de TVA intracommunautaire : FR45513558072
        </p>
        <p>
          Le Directeur de la publication est{" "}
          <strong>MONET François-Xavier</strong> ci-après l&apos;
          <em>Éditeur</em>.
        </p>
      </section>

      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-center text-blue-900">
          Article 2 - L&apos;hébergeur
        </h2>
        <p>
          L&apos;hébergeur du Site est la société <strong>Nuxit</strong>, dont
          le siège social est situé au 97-97B rue du Général Mangin - 38100
          GRENOBLE.
          <br />
          Numéro de téléphone : <a href="tel:+33486576000">04 86 57 60 00</a>
          <br />
          Adresse mail de contact :{" "}
          <a href="mailto:commercial@nuxit.com">commercial@nuxit.com</a>
        </p>
      </section>

      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-center text-blue-900">Article 3 - Accès au site</h2>
        <p>
          Le <em>Site</em> est accessible en tout endroit, 7j/7, 24h/24 sauf cas
          de force majeure, interruption programmée ou non et pouvant découlant
          d&apos;une nécessité de maintenance.
        </p>
        <p>
          En cas de modification, interruption ou suspension du <em>Site</em>,
          l&apos;<em>Éditeur</em> ne saurait être tenu responsable.
        </p>
      </section>

      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-center text-blue-900">
          Article 4 - Collecte de données
        </h2>
        <p>
          Le <em>Site</em> est exempté de déclaration à la Commission Nationale
          Informatique et Libertés (CNIL) dans la mesure où il ne collecte
          aucune donnée concernant les utilisateurs.
        </p>
        <p>
          Toute utilisation, reproduction, diffusion, commercialisation,
          modification de toute ou partie du <em>Site</em>, sans autorisation de
          l&apos;<em>Éditeur</em> est prohibée et pourra entraînée des actions
          et poursuites judiciaires telles que notamment prévues par le Code de
          la propriété intellectuelle et le Code civil.
        </p>
      </section>
    </>
  );
};

export default page;
