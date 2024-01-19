import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleStable } from "../store/stableSlice";

import { ErrorPage } from "./index";
import { FormEcurie } from "../components/index";

export default function AdminEcurieUpdate() {
  const dispatch = useDispatch();
  const { ecurieId } = useParams();

  useEffect(() => {
    dispatch(getSingleStable({ id: ecurieId }));
  }, []);

  const stable = useSelector((state) => state.stables.stable);
  const error = useSelector((state) => state.stables.error);
  const isLoading = useSelector((state) => state.stables.isLoading);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <h1>Modifier une écurie</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        {!isLoading && stable && <FormEcurie type="update" stable={stable} />}
      </main>
    </>
  );
}
