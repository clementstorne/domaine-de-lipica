import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Navigate } from "react-router-dom";

export default function FormPartenaire(props) {
  const [isFormSent, setIsFormSent] = useState(false);
  const [imageBase64url, setImageBase64url] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const { handleSubmit, setValue, register, control, reset } = useForm();

  const hiddenFileInput = useRef(null);

  const handleUploadButtonClick = () => {
    hiddenFileInput.current.click();
  };

  const handleImageInput = (e) => {
    setImageFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.addEventListener("load", () => {
      setImageBase64url(fileReader.result);
    });
  };

  const onSubmit = (data) => {
    if (props.type === "create") {
      const formData = new FormData();
      formData.append("partner", JSON.stringify(data));
      formData.append("logo", imageFile);
      console.log(formData);
      // setIsFormSent(true);
    } else {
      console.log("Partenaire modifié", { ...data });
      setImageBase64url("");
      reset();
    }
  };

  useEffect(() => {
    if (props.partner) {
      setValue("nom", props.partner.nom);
      setValue("informations", props.partner.informations);
      setImageBase64url(`/logos/${props.partner.logo}`);
    }
  }, []);

  return (
    <>
      {isFormSent && (
        <Navigate to="/administration/partenaires" replace={true} />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-144 flex-col flex-nowrap items-center justify-center"
      >
        <div className="w-full max-w-144">
          <label htmlFor="nom" className="form-label">
            Nom
          </label>
          <Controller
            name="nom"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  id="nom"
                  type="text"
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
          <label htmlFor="informations" className="form-label">
            Informations
          </label>
          <textarea
            {...register("informations")}
            id="informations"
            className="form-input h-40"
          />
        </div>

        {imageBase64url && (
          <div className="flex h-40 w-40 items-center justify-center bg-white">
            <img
              src={imageBase64url}
              alt=""
              className="max-h-40 max-w-40 object-fill"
            />
          </div>
        )}

        <input
          {...register("logo")}
          type="file"
          id="logo"
          className="hidden"
          aria-describedby="logo-label"
          accept="image/png, image/jpg, image/jpeg"
          ref={hiddenFileInput}
          onChange={handleImageInput}
        />
        <button
          className="button big-button mt-4"
          onClick={handleUploadButtonClick}
        >
          <label htmlFor="logo" id="logo-label">
            {imageBase64url ? "Modifier le logo" : "Ajouter un logo"}
          </label>
        </button>

        <button type="submit" className="button big-button mt-4">
          {props.type == "create"
            ? "Ajouter le partneiare"
            : "Modifier le partenaire"}
        </button>
      </form>
    </>
  );
}

FormPartenaire.propTypes = {
  type: PropTypes.oneOf(["create", "update"]),
  partner: PropTypes.object,
};