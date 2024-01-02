import events from "../data/concours.json";

import Navbar from "../layouts/Navbar";
import FormConcours from "../components/FormConcours";
import Footer from "../layouts/Footer";

export default function AdminConcoursUpdate() {
  const eventId = window.location.pathname.split("concours/")[1];
  const event = events.filter((event) => event.id === parseInt(eventId))[0];
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
