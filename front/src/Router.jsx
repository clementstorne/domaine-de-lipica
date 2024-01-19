import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Home,
  Presentation,
  Ecurie,
  Concours,
  Horaires,
  Partenaires,
  Contact,
  Login,
  Dashboard,
  AdminConcours,
  AdminConcoursCreate,
  AdminConcoursUpdate,
  AdminEcuries,
  AdminEcurieCreate,
  AdminEcurieUpdate,
  AdminPartenaires,
  AdminPartenaireCreate,
  AdminPartenaireUpdate,
  MentionsLegales,
  SiteMap,
} from "./pages/index.js";
import { Footer, Navbar, ScrollToTop } from "./components/index.js";

export default function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/:ecurieUrl" element={<Ecurie />} />
        <Route path="/concours" element={<Concours />} />
        <Route path="/concours/:concoursId" element={<Horaires />} />
        <Route path="/partenaires" element={<Partenaires />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/administration/login" element={<Login />} />
        <Route path="/administration/dashboard" element={<Dashboard />} />
        <Route path="/administration/concours" element={<AdminConcours />} />
        <Route
          path="/administration/concours/nouveau"
          element={<AdminConcoursCreate />}
        />
        <Route
          path="/administration/concours/:concoursId"
          element={<AdminConcoursUpdate />}
        />
        <Route
          path="/administration/partenaires"
          element={<AdminPartenaires />}
        />
        <Route
          path="/administration/partenaires/nouveau"
          element={<AdminPartenaireCreate />}
        />
        <Route
          path="/administration/partenaires/:partenaireId"
          element={<AdminPartenaireUpdate />}
        />
        <Route path="/administration/ecuries" element={<AdminEcuries />} />
        <Route
          path="/administration/ecuries/nouveau"
          element={<AdminEcurieCreate />}
        />
        <Route
          path="/administration/ecuries/:ecurieId"
          element={<AdminEcurieUpdate />}
        />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/plan-du-site" element={<SiteMap />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
