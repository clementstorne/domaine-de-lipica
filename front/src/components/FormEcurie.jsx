import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createStable, updateStable } from "../store/stableSlice";
import { useForm, Controller } from "react-hook-form";

import { stringToUrl } from "../utils/strUtils";

export default function FormEcurie(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const { handleSubmit, setValue, register, control } = useForm();

  const hiddenFileInput = useRef(null);

  const handleUploadButtonClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleImageInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImageFiles(selectedFiles);

    selectedFiles.map((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setImages((prevImages) => [...prevImages, fileReader.result]);
      };
    });
  };

  const createFormData = (data, imageFiles, id) => {
    const formData = new FormData();
    if (id) {
      formData.append("id", id);
    }
    formData.append("nom", data.nom);
    formData.append("informations", data.informations);
    formData.append("url", stringToUrl(data.nom));
    imageFiles.forEach((imageFile) => {
      formData.append("images", imageFile);
    });
    return formData;
  };

  const onSubmit = (data) => {
    if (props.type === "create") {
      const formData = createFormData(data, imageFiles);
      dispatch(createStable(formData));
      navigate("/administration/ecuries");
    } else {
      const formData = createFormData(data, imageFiles, props.stable.id);
      dispatch(updateStable(formData));
      navigate("/administration/ecuries");
    }
  };

  useEffect(() => {
    if (props.stable) {
      setValue("nom", props.stable.nom);
      setValue("informations", props.stable.informations);
      if (props.stable.images.length > 0) {
        setImages(props.stable.images);
      }
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
          <textarea
            {...register("informations")}
            id="informations"
            className="form-input h-40"
          />
        </div>

        {images.length > 0 && (
          <div className="grid w-full auto-rows-32 grid-cols-3 items-center gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="max-h-full max-w-full self-center justify-self-center object-fill"
              />
            ))}
          </div>
        )}

        <input
          {...register("images")}
          type="file"
          multiple
          id="images"
          className="hidden"
          aria-describedby="images-label"
          accept="image/png, image/jpg, image/jpeg"
          ref={hiddenFileInput}
          onChange={handleImageInput}
        />
        <button
          className="button big-button mt-4"
          onClick={handleUploadButtonClick}
        >
          <label htmlFor="images" id="images-label">
            Ajouter des images
          </label>
        </button>

        <button type="submit" className="button big-button mt-4">
          {props.type == "create" ? "Ajouter l'écurie" : "Modifier l'écurie"}
        </button>
      </form>
    </>
  );
}

FormEcurie.propTypes = {
  type: PropTypes.oneOf(["create", "update"]),
  stable: PropTypes.object,
};
