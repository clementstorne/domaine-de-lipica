import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllStables } from "../store/stableSlice";

import { CardEcurie, LinkButton } from "../components/index";
import { ErrorPage } from "./index";

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
      <h1>Liste des écuries</h1>

      <div className="flex flex-col items-center justify-center mb-4 md:mb-16">
        <LinkButton
          link="/administration/ecuries/nouveau"
          label="Ajouter une écurie"
          size="small"
        />
      </div>

      {stables.length > 0 ? (
        <section className="flex flex-col flex-wrap items-center justify-center mb-8 md:mb-16 md:flex-row md:items-stretch">
          {stables.map((partner) => (
            <CardEcurie key={partner.id} {...partner} />
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
