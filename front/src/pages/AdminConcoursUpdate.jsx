import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getSingleEvent } from "../store/eventSlice";

import Navbar from "../layouts/Navbar";
import FormConcours from "../components/FormConcours";
import Footer from "../layouts/Footer";
import ErrorPage from "./ErrorPage";

export default function AdminConcoursUpdate() {
  const dispatch = useDispatch();

  useEffect(() => {
    const eventId = window.location.pathname.split("concours/")[1];
    dispatch(getSingleEvent({ id: eventId }));
  }, []);

  const event = useSelector((state) => state.events.event);
  const error = useSelector((state) => state.events.error);
  const isLoading = useSelector((state) => state.events.isLoading);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <Navbar />
      <h1>Modifier un concours</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        {!isLoading && <FormConcours type="update" event={event} />}
      </main>

      <Footer />
    </>
  );
}
