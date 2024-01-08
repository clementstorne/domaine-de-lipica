import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { unformatDate } from "../utils/dateUtils";
import EventService from "../services/EventService";

export default function FormConcours(props) {
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
      await EventService.createEvent({ ...data, niveau });
      navigate("/administration/concours");
    } else {
      const niveau = data.niveau.join(" - ");
      await EventService.updateEvent(props.event.id, { ...data, niveau });
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
        className="flex w-full max-w-144 flex-col flex-nowrap items-center justify-center"
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

        <div className="max-w-600 w-full">
          <fieldset
            className={`form-fieldset ${errors.discipline && "!error"}`}
          >
            <legend className="form-label ml-0">Discipline</legend>

            <div className="mb-2 flex flex-col justify-between  md:flex-row md:items-center">
              <div>
                <input
                  {...register("discipline", {
                    required: "Ce champ est requis",
                  })}
                  type="radio"
                  id="cso"
                  name="discipline"
                  value="cso"
                />
                <label htmlFor="cso" className="ml-2">
                  CSO
                </label>
              </div>

              <div>
                <input
                  {...register("discipline", {
                    required: "Ce champ est requis",
                  })}
                  type="radio"
                  id="dressage"
                  name="discipline"
                  value="dressage"
                />
                <label htmlFor="dressage" className="ml-2">
                  Dressage
                </label>
              </div>

              <div>
                <input
                  {...register("discipline", {
                    required: "Ce champ est requis",
                  })}
                  type="radio"
                  id="hunter"
                  name="discipline"
                  value="hunter"
                />
                <label htmlFor="hunter" className="ml-2">
                  Hunter
                </label>
              </div>

              <div>
                <input
                  {...register("discipline", {
                    required: "Ce champ est requis",
                  })}
                  type="radio"
                  id="voltige"
                  name="discipline"
                  value="voltige"
                />
                <label htmlFor="voltige" className="ml-2">
                  Voltige
                </label>
              </div>
            </div>
          </fieldset>
          {errors.discipline && (
            <p className="error-message">{errors.discipline.message}</p>
          )}
        </div>

        <div className="max-w-600 w-full">
          <fieldset className={`form-fieldset ${errors.niveau && "!error"}`}>
            <legend className="form-label ml-0">Niveau</legend>

            <div className="mb-2 flex flex-col justify-between md:grid md:grid-flow-col md:grid-cols-3 md:grid-rows-2">
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

        <div className="max-w-600 w-full">
          <label htmlFor="horaires" className="form-label">
            Horaires
          </label>
          <textarea
            {...register("horaires")}
            id="horaires"
            className="form-input h-40"
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

        <button type="submit" className="button big-button mt-4">
          {props.type == "create"
            ? "Ajouter le concours"
            : "Modifier le concours"}
        </button>
      </form>
    </>
  );
}

FormConcours.propTypes = {
  type: PropTypes.oneOf(["create", "update"]),
  event: PropTypes.object,
};
