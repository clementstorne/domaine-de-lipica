import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getSingleStable } from "../store/stableSlice";

import Navbar from "../layouts/Navbar";
import FormEcurie from "../components/FormEcurie";
import Footer from "../layouts/Footer";
import ErrorPage from "./ErrorPage";

export default function AdminEcurieUpdate() {
  const dispatch = useDispatch();

  useEffect(() => {
    const stableId = window.location.pathname.split("ecuries/")[1];
    dispatch(getSingleStable({ id: stableId }));
  }, []);

  const stable = useSelector((state) => state.stables.stable);
  const error = useSelector((state) => state.stables.error);
  const isLoading = useSelector((state) => state.stables.isLoading);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <Navbar />
      <h1>Ajouter une écurie</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        {!isLoading && <FormEcurie type="update" stable={stable} />}
      </main>

      <Footer />
    </>
  );
}
