import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function FormEcurie(props) {
  const [images, setImages] = useState([]);
  const [imageBase64url, setImageBase64url] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const { handleSubmit, setValue, register, control, reset } = useForm();

  const hiddenFileInput = useRef(null);

  const handleUploadButtonClick = () => {
    hiddenFileInput.current.click();
  };

  const handleImageInput = (e) => {
    setImageFile(e.target.files[0]);
    console.log(e.target.files);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.addEventListener("load", () => {
      setImageBase64url(fileReader.result);
    });
    setImages((images) => [...images, imageBase64url]);
  };

  const onSubmit = (data) => {
    if (props.type === "create") {
      console.log("Partenaire créé", { ...data });
      // setImageBase64url("");
      // reset();
    } else {
      console.log("Partenaire modifié", { ...data });
      // setImageBase64url("");
      // reset();
    }
  };

  useEffect(() => {
    if (props.stable) {
      setValue("nom", props.stable.nom);
      setValue("informations", props.stable.informations);
      setImages(props.stable.images);
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
                src={`/${image}`}
                alt=""
                className="max-h-full max-w-full self-center justify-self-center object-fill"
              />
            ))}
            {imageBase64url && (
              <img
                src={imageBase64url}
                alt=""
                className="max-h-full max-w-full self-center justify-self-center object-fill"
              />
            )}
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
            {imageBase64url ? "Modifier les images" : "Ajouter une image"}
          </label>
        </button>

        <button type="submit" className="button big-button mt-4">
          {props.type == "create" ? "Ajouter l'écurie" : "Modifier l'écurie'"}
        </button>
      </form>
    </>
  );
}

FormEcurie.propTypes = {
  type: PropTypes.oneOf(["create", "update"]),
  stable: PropTypes.object,
};
