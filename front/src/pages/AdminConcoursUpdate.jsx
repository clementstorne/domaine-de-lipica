import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleEvent } from "../store/eventSlice";

import { ErrorPage } from "./index";
import { FormConcours } from "../components/index";

export default function AdminConcoursUpdate() {
  const dispatch = useDispatch();
  const { concoursId } = useParams();

  useEffect(() => {
    dispatch(getSingleEvent({ id: concoursId }));
  }, []);

  const event = useSelector((state) => state.events.event);
  const error = useSelector((state) => state.events.error);
  const isLoading = useSelector((state) => state.events.isLoading);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <h1>Modifier un concours</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        {!isLoading && event && <FormConcours type="update" event={event} />}
      </main>
    </>
  );
}
