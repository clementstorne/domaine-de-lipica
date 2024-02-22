import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPartner, updatePartner } from "../store/partnerSlice";

export default function FormPartenaire(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageBase64url, setImageBase64url] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { handleSubmit, setValue, register, control } = useForm();

  const hiddenFileInput = useRef(null);

  const handleUploadButtonClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleImageInput = (e) => {
    setImageFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = () => {
      setImageBase64url(fileReader.result);
    };
  };

  const createFormData = (data, imageFile, id) => {
    const formData = new FormData();
    if (id) {
      formData.append("id", id);
    }
    formData.append("nom", data.nom);
    formData.append("informations", data.informations);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    return formData;
  };

  const onSubmit = (data) => {
    if (props.type === "create") {
      const formData = createFormData(data, imageFile);
      dispatch(createPartner(formData));
      navigate("/administration/partenaires");
    } else {
      setImageBase64url("");
      const formData = createFormData(data, imageFile, props.partner.id);
      dispatch(updatePartner(formData));
      navigate("/administration/partenaires");
    }
  };

  useEffect(() => {
    if (props.partner) {
      setValue("nom", props.partner.nom);
      setValue("informations", props.partner.informations);
      setImageBase64url(`${props.partner.logo}`);
    }
  }, []);

  return (
    <>
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
          <Controller
            name="informations"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
            }}
            render={({ field, fieldState }) => (
              <>
                <textarea
                  id="informations"
                  type="text"
                  className={`form-input h-40 py-0 ${
                    fieldState?.error && "!error"
                  }`}
                  {...field}
                />
                {fieldState?.error && (
                  <p className="error-message">{fieldState.error.message}</p>
                )}
              </>
            )}
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
          name="image"
          id="logo"
          className="hidden"
          aria-describedby="logo-label"
          accept="image/png, image/jpg, image/jpeg, image/svg+xml, image/webp"
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
            ? "Ajouter le partenaire"
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
