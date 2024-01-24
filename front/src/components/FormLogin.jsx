import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../store/authSlice.js";

export default function FormLogin() {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm();

  const isAuth = useSelector((state) => state.auth.isAuth);

  const onSubmit = (data) => {
    dispatch(login(data));
    reset();
  };

  return (
    <>
      {isAuth && <Navigate to="/administration/dashboard" replace={true} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full max-w-144 flex-nowrap"
      >
        <div className="w-full max-w-600">
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

        <div className="w-full max-w-600">
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

        <button type="submit" className="mt-4 button big-button">
          Se connecter
        </button>
      </form>
    </>
  );
}
