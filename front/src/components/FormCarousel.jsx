import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createImage, updateImage } from "../store/carouselSlice";

export default function FormCarousel(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageBase64url, setImageBase64url] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {
    handleSubmit,
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm();

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
    formData.append("title", data.title);
    formData.append("alt", data.alt);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    return formData;
  };

  const onSubmit = (data) => {
    if (props.type === "create") {
      const formData = createFormData(data, imageFile);
      dispatch(createImage(formData));
      navigate("/administration/carousel");
    } else {
      setImageBase64url("");
      const formData = createFormData(data, imageFile, props.image.id);
      dispatch(updateImage(formData));
      navigate("/administration/carousel");
    }
  };

  useEffect(() => {
    if (props.image) {
      setValue("title", props.image.title);
      setValue("alt", props.image.alt);
      setImageBase64url(`${props.image.url}`);
    }
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-144 flex-col flex-nowrap items-center justify-center"
      >
        {props.type === "create" && (
          <>
            <input
              {...register("image", {
                required: "Vous devez sélectionner une image",
              })}
              type="file"
              name="image"
              id="image"
              className="hidden"
              aria-describedby="image-label"
              accept="image/png, image/jpg, image/jpeg, image/svg+xml, image/webp"
              ref={hiddenFileInput}
              onChange={handleImageInput}
            />
            <button
              className="button big-button mb-4"
              onClick={handleUploadButtonClick}
            >
              <label htmlFor="image" id="image-label">
                {imageBase64url ? "Modifier l'image" : "Sélectionner une image"}
              </label>
            </button>
            {errors.image && (
              <p className="error-message">{errors.image.message}</p>
            )}
          </>
        )}

        {imageBase64url && (
          <div className="flex h-80 w-80 items-center justify-center bg-white">
            <img
              src={imageBase64url}
              alt=""
              className="max-h-80 max-w-80 object-fill"
            />
          </div>
        )}

        <div className="w-full max-w-144">
          <label htmlFor="title" className="form-label">
            Titre
          </label>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  id="title"
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

        <div className="w-full max-w-144">
          <label htmlFor="alt" className="form-label">
            Description
          </label>
          <Controller
            name="alt"
            control={control}
            defaultValue=""
            rules={{
              required: "Ce champ est requis",
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  id="alt"
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

        <button type="submit" className="button big-button mt-4">
          Enregistrer l&apos;image
        </button>
      </form>
    </>
  );
}

FormCarousel.propTypes = {
  type: PropTypes.oneOf(["create", "update"]),
  image: PropTypes.object,
};
