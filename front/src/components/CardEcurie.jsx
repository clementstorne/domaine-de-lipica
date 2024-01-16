import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { deleteStable } from "../store/stableSlice";

import Button from "../layouts/Button";
import LinkButton from "../layouts/LinkButton";

import { newlineToBreakTag } from "../utils/strUtils";

export default function CardEcurie(props) {
  const dispatch = useDispatch();

  const handleDeleteClick = () => dispatch(deleteStable({ id: props.id }));

  return (
    <div className="blue-gradient mb-8 flex w-full max-w-88 flex-col flex-nowrap items-center justify-start rounded-10 p-4 text-gray-50 md:mx-2 md:max-w-112">
      <h3 className="mb-4">{props.nom}</h3>
      <div className="flex w-full flex-col items-center justify-center ">
        {props.images && props.images.length > 0 && (
          <div className="my-4 grid w-full auto-rows-16 grid-cols-3 items-center gap-2">
            {props.images &&
              props.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt=""
                  className="max-h-full max-w-full self-center justify-self-center object-fill"
                />
              ))}
          </div>
        )}
        <p
          className="w-full text-sm md:w-auto"
          dangerouslySetInnerHTML={{
            __html: newlineToBreakTag(props.informations),
          }}
        />
      </div>
      <div className="mt-4 flex flex-row">
        <LinkButton
          link={"/administration/ecuries/" + props.id}
          label="Modifier"
          size="small"
          className="mr-4"
        />
        <Button
          onClick={handleDeleteClick}
          label="Supprimer"
          size="small"
          className="mr-4"
        />
      </div>
    </div>
  );
}

CardEcurie.propTypes = {
  id: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  informations: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object),
};
