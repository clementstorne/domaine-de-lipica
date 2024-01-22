import PropTypes from "prop-types";
import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent, updateEvent } from "../store/eventSlice";

import { unformatDate } from "../utils/dateUtils";
import { DISCIPLINES } from "../utils/disciplineUtils";

function RadioButton({ name, value, label, register }) {
  const id = `${name}-${value}`;

  return (
    <div>
      <input
        {...register(name, {
          required: "Ce champ est requis",
        })}
        type="radio"
        id={id}
        name={name}
        value={value}
      />
      <label htmlFor={id} className="ml-2">
        {label}
      </label>
    </div>
  );
}

export default function FormConcours(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (data) => {
    if (props.type === "create") {
      const niveau = data.niveau.join(" - ");
      dispatch(createEvent({ ...data, niveau }));
      navigate("/administration/concours");
    } else {
      const niveau = data.niveau.join(" - ");
      dispatch(updateEvent({ ...data, niveau, id: props.event.id }));
      navigate("/administration/concours");
    }
  };

  useEffect(() => {
    if (props.event) {
      setValue("debut", unformatDate(props.event.debut));
      setValue("fin", unformatDate(props.event.fin));
      setValue("discipline", props.event.discipline);
      setValue("niveau", props.event.niveau.split(" - "));
      setValue("horaires", props.event.horaires);
      setValue("lienWinJump", props.event.lienWinJump);
    }
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full max-w-144 flex-nowrap"
      >
        <div className="w-full max-w-144">
          <label htmlFor="debut" className="form-label">
            Date de début
          </label>
          <Controller
            name="debut"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  id="debut"
                  type="date"
                  className={`form-input py-0 ${fieldState?.error && "!error"}`}
                  {...field}
                />
                {fieldState?.error && (
                  <p className="error-message">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="w-full max-w-144">
          <label htmlFor="fin" className="form-label">
            Date de fin
          </label>
          <Controller
            name="fin"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  id="fin"
                  type="date"
                  className={`form-input py-0 ${fieldState?.error && "!error"}`}
                  {...field}
                />
                {fieldState?.error && (
                  <p className="error-message">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="w-full max-w-600">
          <fieldset
            className={`form-fieldset ${errors.discipline && "!error"}`}
          >
            <legend className="ml-0 form-label">Discipline</legend>

            <div className="flex flex-col justify-between mb-2 md:grid md:grid-cols-4">
              {DISCIPLINES.map((discipline) => (
                <RadioButton
                  key={discipline.code}
                  name="discipline"
                  value={discipline.code}
                  label={discipline.name}
                  register={register}
                />
              ))}
            </div>
          </fieldset>
          {errors.discipline && (
            <p className="error-message">{errors.discipline.message}</p>
          )}
        </div>

        <div className="w-full max-w-600">
          <fieldset className={`form-fieldset ${errors.niveau && "!error"}`}>
            <legend className="ml-0 form-label">Niveau</legend>

            <div className="flex flex-col justify-between mb-2 md:grid md:grid-flow-col md:grid-cols-3 md:grid-rows-2">
              <div>
                <input
                  {...register("niveau", {
                    required: "Ce champ est requis",
                  })}
                  type="checkbox"
                  id="amateur"
                  name="niveau"
                  value="Amateur"
                />
                <label htmlFor="amateur" className="ml-2">
                  Amateur
                </label>
              </div>

              <div>
                <input
                  {...register("niveau", {
                    required: "Ce champ est requis",
                  })}
                  type="checkbox"
                  id="pro"
                  name="niveau"
                  value="Pro"
                />
                <label htmlFor="pro" className="ml-2">
                  Pro
                </label>
              </div>

              <div>
                <input
                  {...register("niveau", {
                    required: "Ce champ est requis",
                  })}
                  type="checkbox"
                  id="cyclesLibres"
                  name="niveau"
                  value="Cycles Libres"
                />
                <label htmlFor="cyclesLibres" className="ml-2">
                  Cycles Libres
                </label>
              </div>

              <div>
                <input
                  {...register("niveau", {
                    required: "Ce champ est requis",
                  })}
                  type="checkbox"
                  id="cyclesClassiques"
                  name="niveau"
                  value="Cycles Classiques"
                />
                <label htmlFor="cyclesClassiques" className="ml-2">
                  Cycles Classiques
                </label>
              </div>

              <div>
                <input
                  {...register("niveau", {
                    required: "Ce champ est requis",
                  })}
                  type="checkbox"
                  id="club"
                  name="niveau"
                  value="Club"
                />
                <label htmlFor="club" className="ml-2">
                  Club
                </label>
              </div>

              <div>
                <input
                  {...register("niveau", {
                    required: "Ce champ est requis",
                  })}
                  type="checkbox"
                  id="poney"
                  name="niveau"
                  value="Poney"
                />
                <label htmlFor="poney" className="ml-2">
                  Poney
                </label>
              </div>
            </div>
          </fieldset>
          {errors.niveau && (
            <p className="error-message">{errors.niveau.message}</p>
          )}
        </div>

        <div className="w-full max-w-600">
          <label htmlFor="horaires" className="form-label">
            Horaires
          </label>
          <textarea
            {...register("horaires")}
            id="horaires"
            className="h-40 form-input"
          />
        </div>

        <div className="w-full max-w-144">
          <label htmlFor="lienWinJump" className="form-label">
            Lien WinJump
          </label>
          <input
            {...register("lienWinJump")}
            id="lienWinJump"
            className="form-input"
          />
        </div>

        <button type="submit" className="mt-4 button big-button">
          {props.type == "create"
            ? "Ajouter le concours"
            : "Modifier le concours"}
        </button>
      </form>
    </>
  );
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};

FormConcours.propTypes = {
  type: PropTypes.oneOf(["create", "update"]),
  event: PropTypes.object,
};
