import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer, GuardAuth, Navbar, ScrollToTop } from "./components/index.js";
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
        <Route
          path="/administration/dashboard"
          element={
            <GuardAuth>
              <Dashboard />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/carousel"
          element={
            <GuardAuth>
              <AdminCarousel />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/carousel/nouveau"
          element={
            <GuardAuth>
              <AdminCarouselCreate />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/carousel/:imageId"
          element={
            <GuardAuth>
              <AdminCarouselUpdate />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/concours"
          element={
            <GuardAuth>
              <AdminConcours />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/concours/nouveau"
          element={
            <GuardAuth>
              <AdminConcoursCreate />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/concours/:concoursId"
          element={
            <GuardAuth>
              <AdminConcoursUpdate />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/partenaires"
          element={
            <GuardAuth>
              <AdminPartenaires />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/partenaires/nouveau"
          element={
            <GuardAuth>
              <AdminPartenaireCreate />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/partenaires/:partenaireId"
          element={
            <GuardAuth>
              <AdminPartenaireUpdate />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/ecuries"
          element={
            <GuardAuth>
              <AdminEcuries />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/ecuries/nouveau"
          element={
            <GuardAuth>
              <AdminEcurieCreate />
            </GuardAuth>
          }
        />
        <Route
          path="/administration/ecuries/:ecurieId"
          element={
            <GuardAuth>
              <AdminEcurieUpdate />
            </GuardAuth>
          }
        />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/plan-du-site" element={<SiteMap />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
