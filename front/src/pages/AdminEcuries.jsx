import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllStables } from "../store/stableSlice";

import { ErrorPage } from "./index";
import { CardEcurie, Footer, LinkButton, Navbar } from "../components/index";

export default function AdminEcuries() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStables());
  }, []);

  const stables = useSelector((state) => state.stables.stablesList);
  const error = useSelector((state) => state.stables.error);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <Navbar />
      <h1>Liste des écuries</h1>
      <section className="mb-8 flex flex-col flex-wrap items-center justify-center md:mb-16 md:flex-row md:items-stretch">
        {stables.map((partner) => (
          <CardEcurie key={partner.id} {...partner} />
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
      <Footer />
    </>
  );
}
