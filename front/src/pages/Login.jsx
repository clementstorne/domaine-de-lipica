import Navbar from "../layouts/Navbar";
import FormLogin from "../components/FormLogin";
import Footer from "../layouts/Footer";

export default function Login() {
  return (
    <>
      <Navbar />
      <h1>Administration du site</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormLogin />
      </main>

      <Footer />
    </>
  );
}
