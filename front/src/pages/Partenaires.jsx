import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllPartners } from "../store/partnerSlice";

import { CardPartenaire } from "../components/index";
import { ErrorPage } from "./index";

export default function Partenaires() {
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
      <h1>Partenaires</h1>
      <section className="flex flex-col flex-wrap items-center justify-center md:flex-row md:items-stretch">
        {partners.map((partner) => (
          <CardPartenaire key={partner.id} {...partner} />
        ))}
      </section>
    </>
  );
}
