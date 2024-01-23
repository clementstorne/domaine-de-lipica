import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer, Navbar, ScrollToTop } from "./components/index.js";
import {
  AdminCarousel,
  AdminCarouselCreate,
  AdminCarouselUpdate,
  AdminConcours,
  AdminConcoursCreate,
  AdminConcoursUpdate,
  AdminEcurieCreate,
  AdminEcurieUpdate,
  AdminEcuries,
  AdminPartenaireCreate,
  AdminPartenaireUpdate,
  AdminPartenaires,
  Concours,
  Contact,
  Dashboard,
  Ecurie,
  Home,
  Horaires,
  Login,
  MentionsLegales,
  Partenaires,
  Presentation,
  SiteMap,
} from "./pages/index.js";

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
        <Route path="/administration/carousel" element={<AdminCarousel />} />
        <Route
          path="/administration/carousel/nouveau"
          element={<AdminCarouselCreate />}
        />
        <Route
          path="/administration/carousel/:imageId"
          element={<AdminCarouselUpdate />}
        />
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
