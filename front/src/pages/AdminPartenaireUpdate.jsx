import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePartner } from "../store/partnerSlice";

import { ErrorPage } from "./index";
import { FormPartenaire } from "../components/index";

export default function AdminPartenaireUpdate() {
  const dispatch = useDispatch();
  const { partenaireId } = useParams();

  useEffect(() => {
    dispatch(getSinglePartner({ id: partenaireId }));
  }, []);

  const partner = useSelector((state) => state.partners.partner);
  const error = useSelector((state) => state.partners.error);
  const isLoading = useSelector((state) => state.partners.isLoading);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <h1>Modifier un Partenaire</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        {!isLoading && partner && (
          <FormPartenaire type="update" partner={partner} />
        )}
      </main>
    </>
  );
}
