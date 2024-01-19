import { FormLogin } from "../components/index";

export default function Login() {
  return (
    <>
      <h1>Administration du site</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormLogin />
      </main>
    </>
  );
}
