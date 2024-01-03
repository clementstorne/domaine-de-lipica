import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Navigate } from "react-router-dom";

export default function FormLogin() {
  const [isAuth, setIsAuth] = useState(false);
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setIsAuth(true);
    reset();
  };

  return (
    <>
      {isAuth && <Navigate to="/administration/dashboard" replace={true} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-144 flex-col flex-nowrap items-center justify-center"
      >
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
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  id="password"
                  className={`form-input ${fieldState?.error ? "error" : ""}`}
                  {...field}
                  type="password"
                  autoComplete="current-password"
                />
                {fieldState?.error && (
                  <p className="error-message">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>

        <button type="submit" className="button big-button mt-4">
          Se connecter
        </button>
      </form>
    </>
  );
}
