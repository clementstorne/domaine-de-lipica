import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllPartners } from "../store/partnerSlice";

import { CardPartenaire, LinkButton } from "../components/index";
import { ErrorPage } from "./index";

export default function AdminPartenaires() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPartners());
  }, []);

  const partners = useSelector((state) => state.partners.partnersList);
  const error = useSelector((state) => state.partners.error);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <h1>Liste des partenaires</h1>

      <div className="flex flex-col items-center justify-center mb-4 md:mb-16">
        <LinkButton
          link="/administration/partenaires/nouveau"
          label="Ajouter un partenaire"
          size="small"
        />
      </div>

      {partners.length > 0 ? (
        <section className="flex flex-col flex-wrap items-center justify-center mb-8 md:mb-16 md:flex-row md:items-stretch">
          {partners.map((partner) => (
            <CardPartenaire key={partner.id} {...partner} admin={true} />
          ))}
        </section>
      ) : (
        <></>
      )}

      <div className="flex flex-col items-center justify-center mb-8 md:mb-16">
        <LinkButton
          link="/administration/dashboard/"
          label="Retour au dashboard"
          size="small"
        />
      </div>
    </>
  );
}
