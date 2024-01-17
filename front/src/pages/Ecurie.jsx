import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getStableByUrl } from "../store/stableSlice";

import { ErrorPage } from "./index";
import { EcurieSection, Footer, Navbar } from "../components/index";

export default function Ecurie() {
  const dispatch = useDispatch();
  const { ecurieUrl } = useParams();

  useEffect(() => {
    dispatch(getStableByUrl({ url: ecurieUrl }));
  }, [ecurieUrl]);

  const stable = useSelector((state) => state.stables.stable);
  const error = useSelector((state) => state.stables.error);
  const isLoading = useSelector((state) => state.stables.isLoading);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <Navbar />
      {!isLoading && stable && <EcurieSection stable={stable} />}
      <Footer />
    </>
  );
}
