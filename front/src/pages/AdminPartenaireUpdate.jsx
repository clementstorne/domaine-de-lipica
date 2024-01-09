import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getSinglePartner } from "../store/partnerSlice";

import Navbar from "../layouts/Navbar";
import FormPartenaire from "../components/FormPartenaire";
import Footer from "../layouts/Footer";
import ErrorPage from "./ErrorPage";

export default function AdminPartenaireUpdate() {
  const dispatch = useDispatch();

  useEffect(() => {
    const partnerId = window.location.pathname.split("partenaires/")[1];
    dispatch(getSinglePartner({ id: partnerId }));
  }, []);

  const partner = useSelector((state) => state.partners.partner);
  const error = useSelector((state) => state.partners.error);
  const isLoading = useSelector((state) => state.partners.isLoading);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <Navbar />
      <h1>Modifier un Partenaire</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        {!isLoading && <FormPartenaire type="update" partner={partner} />}
      </main>

      <Footer />
    </>
  );
}
