import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllPartners } from "../store/partnerSlice";

import { ErrorPage } from "./index";
import { CardPartenaire, LinkButton } from "../components/index";

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
      <section className="mb-8 flex flex-col flex-wrap items-center justify-center md:mb-16 md:flex-row md:items-stretch">
        {partners.map((partner) => (
          <CardPartenaire key={partner.id} {...partner} admin={true} />
        ))}
      </section>

      <div className="mb-8 flex flex-col items-center justify-center md:mb-16">
        <LinkButton
          link="/administration/dashboard/"
          label="Retour au dashboard"
          size="small"
          className="mr-4"
        />
      </div>
    </>
  );
}
