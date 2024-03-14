import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
};

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  } else {
    return (
      <>
        <h1>Connexion</h1>

        <section
          className={cn(
            "max-w-[600px] w-full mx-4 space-y-4",
            "md:max-w-[800px] md:w-1/2 md:mx-8"
          )}
        >
          <LoginForm />
        </section>
      </>
    );
  }
};

export default page;
