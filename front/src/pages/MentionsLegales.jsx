import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Mentions légales</h1>

      <section className="px-4 md:px-0">
        <p className="mb-4">
          Conformément aux dispositions des Articles 6-III et 19 de la Loi
          n°2004-575 du 21 juin 2004 pour la Confiance dans l&apos;économie
          numérique, dite L.C.E.N., il est porté à la connaissance des
          utilisateurs et visiteurs, ci-après l&apos;
          <em>Utilisateur</em>, du site{" "}
          <Link to="/" className="link">
            www.ozoir-equitation.com
          </Link>
          , ci-après le <em>Site</em>, les présentes mentions légales.
        </p>
        <p className="mb-4">
          La connexion et la navigation sur le <em>Site</em> par l&apos;
          <em>Utilisateur</em> implique acceptation intégrale et sans réserve
          des présentes mentions légales.
        </p>
        <p>
          Ces dernières sont accessibles sur le <em>Site</em> à la rubrique{" "}
          <Link to="/mentions-legales" className="link">
            Mentions légales
          </Link>
        </p>
      </section>

      <section className="px-4 md:px-0">
        <h2 className="text-blue-900">Article 1 - L&apos;éditeur</h2>
        <p className="mb-4">
          L&apos;édition du Site est assurée par Domaine de Lipica
          _______________ au capital de _______________ €, immatriculée au
          Registre du Commerce et des Sociétés de MELUN sous le numéro 443068176
          dont le siège social est situé au 1, rond-point du Manège 77330
          OZOIR-LA- FERRIÈRE, Numéro de téléphone _______________, Adresse
          e-mail : _______________. N° de TVA intracommunautaire :
          _______________
        </p>
        <p>
          Le Directeur de la publication est MONET François-Xavier ci-après
          l&apos;<em>Éditeur</em>.
        </p>
      </section>

      <section className="px-4 md:px-0">
        <h2 className="text-blue-900">Article 2 - L&apos;hébergeur</h2>
        <p>
          L&apos;hébergeur du Site est la société _______________, dont le siège
          social est situé au _______________, avec le numéro de téléphone :
          _______________ + adresse mail de contact
        </p>
      </section>

      <section className="px-4 md:px-0">
        <h2 className="text-blue-900">Article 3 - Accès au site</h2>
        <p className="mb-4">
          Le <em>Site</em> est accessible en tout endroit, 7j/7, 24h/24 sauf cas
          de force majeure, interruption programmée ou non et pouvant découlant
          d&apos;une nécessité de maintenance.
        </p>
        <p>
          En cas de modification, interruption ou suspension du <em>Site</em>,
          l&apos;<em>Éditeur</em> ne saurait être tenu responsable.
        </p>
      </section>

      <section className="px-4 md:px-0">
        <h2 className="text-blue-900">Article 4 - Collecte de données</h2>
        <p className="mb-4">
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
}
