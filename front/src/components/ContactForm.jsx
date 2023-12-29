import { useForm, Controller } from "react-hook-form";

import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const templateParams = {
      lastname: data.lastname,
      firstname: data.firstname,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      message: data.message,
    };
    // emailjs.send(
    //   import.meta.env.VITE_EMAILJS_SERVICE_ID,
    //   import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    //   templateParams,
    //   import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    // );
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-144 flex-col flex-nowrap items-center justify-center"
      >
        <div className="w-full max-w-144">
          <label htmlFor="lastname" className="form-label">
            Nom
          </label>
          <Controller
            name="lastname"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ-' ]+$/i,
                message: "Nom invalide",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  id="lastname"
                  className={`form-input ${fieldState?.error && "!error"}`}
                  {...field}
                  placeholder="Votre nom"
                  autoComplete="family-name"
                />
                {fieldState?.error && (
                  <p className="error-message">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="w-full max-w-144">
          <label htmlFor="firstname" className="form-label">
            Prénom
          </label>
          <Controller
            name="firstname"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ-' ]+$/i,
                message: "Prénom invalide",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  id="firstname"
                  className={`form-input ${fieldState?.error ? "error" : ""}`}
                  {...field}
                  placeholder="Votre prénom"
                  autoComplete="given-name"
                />
                {fieldState?.error && (
                  <p className="error-message">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="max-w-600 w-full">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Adresse email invalide",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  id="email"
                  className={`form-input ${fieldState?.error ? "error" : ""}`}
                  {...field}
                  type="email"
                  placeholder="Votre email"
                  autoComplete="email"
                />
                {fieldState?.error && (
                  <p className="error-message">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="max-w-600 w-full">
          <label htmlFor="phone" className="form-label">
            Téléphone
          </label>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
              pattern: {
                value: /^0[0-9]{9}$/i,
                message:
                  "Numéro de téléphone invalide (10 chiffres, en commençant par un 0)",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  id="phone"
                  className={`form-input ${fieldState?.error ? "error" : ""}`}
                  {...field}
                  type="tel"
                  placeholder="Votre numéro de téléphone"
                  autoComplete="tel-area-code"
                />
                {fieldState?.error && (
                  <p className="error-message">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="w-full max-w-144">
          <label htmlFor="organization" className="form-label">
            Société
          </label>
          <Controller
            name="organization"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
              pattern: {
                value: /^[A-Za-z0-9À-ÖØ-öø-ÿ-' ]+$/i,
                message: "Nom de société invalide",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  id="organization"
                  className={`form-input ${fieldState?.error ? "error" : ""}`}
                  {...field}
                  placeholder="Votre société"
                  autoComplete="organization"
                />
                {fieldState?.error && (
                  <p className="error-message">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="max-w-600 w-full">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <Controller
            name="message"
            control={control}
            defaultValue=""
            rules={{ required: "Ce champ est requis" }}
            render={({ field, fieldState }) => (
              <>
                <textarea
                  id="message"
                  className={`form-input h-40 ${
                    fieldState?.error ? "error" : ""
                  }`}
                  {...field}
                  placeholder="Votre message"
                ></textarea>
                {fieldState?.error && (
                  <p className="error-message">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>

        <button type="submit" className="button big-button mt-4">
          Valider et envoyer
        </button>
      </form>
    </>
  );
}
