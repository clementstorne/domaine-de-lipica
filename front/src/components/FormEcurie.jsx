import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStable, resetStable, updateStable } from "../store/stableSlice";

import { FaRegTrashCan } from "react-icons/fa6";

import ImageService from "../services/ImagesService";
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

  const handleRemoveImage = async (e, index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedImageFiles = [...imageFiles];
    updatedImageFiles.splice(index, 1);
    setImageFiles(updatedImageFiles);

    if (props.type === "update" && props.stable.images[index]) {
      const imageUrl = props.stable.images[index];

      try {
        await ImageService.deleteImage(imageUrl);
      } catch (error) {
        console.error(error);
      }
    }
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
      dispatch(resetStable());
    } else {
      const formData = createFormData(data, imageFiles, props.stable.id);
      dispatch(updateStable(formData));
      navigate("/administration/ecuries");
      dispatch(resetStable());
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
        className="flex flex-col items-center justify-center w-full max-w-144 flex-nowrap"
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

        <div className="w-full max-w-600">
          <label htmlFor="informations" className="form-label">
            Informations
          </label>
          <textarea
            {...register("informations")}
            id="informations"
            className="h-40 form-input"
          />
        </div>

        {images.length > 0 && (
          <div className="grid items-center w-full grid-cols-3 gap-2 auto-rows-32">
            {images.map((image, index) => (
              <div key={index} className="relative w-full h-full">
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="self-center object-fill max-w-full max-h-full m-auto justify-self-center"
                />
                <button
                  type="button"
                  className="absolute z-10 p-2 -translate-x-1/2 rounded-full outline-none bottom-2 left-1/2 bg-sun-400 text-gray-950 drop-shadow-base hover:border-4 hover:border-sun-400 hover:bg-gray-50 hover:p-1 focus:border-4 focus:border-sun-400 focus:bg-gray-50 focus:p-1"
                  onClick={(e) => handleRemoveImage(e, index)}
                >
                  <FaRegTrashCan />
                </button>
              </div>
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
          accept="image/png, image/jpg, image/jpeg, image/webp"
          ref={hiddenFileInput}
          onChange={handleImageInput}
        />
        <button
          className="mt-4 button big-button"
          onClick={handleUploadButtonClick}
        >
          <label htmlFor="images" id="images-label">
            Ajouter des images
          </label>
        </button>

        <button type="submit" className="mt-4 button big-button">
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
