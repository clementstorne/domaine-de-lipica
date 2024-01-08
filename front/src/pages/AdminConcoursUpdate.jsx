import Navbar from "../layouts/Navbar";
import FormConcours from "../components/FormConcours";
import Footer from "../layouts/Footer";

import EventService from "../services/EventService";
import { useEffect, useState } from "react";

export default function AdminConcoursUpdate() {
  const eventId = window.location.pathname.split("concours/")[1];
  const [event, setEvent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await EventService.getSingleTask(eventId);
        setEvent(res.data.event);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!event || isLoading) {
    return <p>Chargement…</p>;
  }
  return (
    <>
      <Navbar />
      <h1>Modifier un concours</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormConcours type="update" event={event} />
      </main>

      <Footer />
    </>
  );
}
