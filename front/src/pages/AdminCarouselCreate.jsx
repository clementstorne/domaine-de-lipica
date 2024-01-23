import { FormCarousel } from "../components/index";

export default function AdminCarouselCreate() {
  return (
    <>
      <h1>Ajouter une image</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormCarousel type="create" />
      </main>
    </>
  );
}
