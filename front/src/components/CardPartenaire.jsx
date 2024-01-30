import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { deletePartner } from "../store/partnerSlice";

import { Button, LinkButton } from "./index";

import { newlineToBreakTag } from "../utils/strUtils";

export default function CardPartenaire(props) {
  const dispatch = useDispatch();

  const handleDeleteClick = () => dispatch(deletePartner({ id: props.id }));

  return (
    <div className="flex flex-col items-center justify-start w-full p-4 mb-8 blue-gradient max-w-88 flex-nowrap rounded-10 text-gray-50 md:mx-2 ">
      <h3>{props.nom}</h3>
      <div className="flex flex-col items-center justify-center w-full md:justify-start">
        <div
          className={`my-4 flex h-40 w-40 items-center justify-center md:mr-4 ${
            props.logo ? "bg-white" : "bg-gray-400"
          }`}
        >
          {props.logo && (
            <img
              src={props.logo}
              alt={`Logo de ${props.nom}`}
              className="object-fill"
            />
          )}
        </div>

        <p
          className="w-full text-sm md:w-auto"
          dangerouslySetInnerHTML={{
            __html: newlineToBreakTag(props.informations),
          }}
        />
      </div>
      {props.admin && (
        <div className="flex flex-row mt-4 gap-x-4">
          <LinkButton
            link={"/administration/partenaires/" + props.id}
            label="Modifier"
            size="small"
          />
          <Button onClick={handleDeleteClick} label="Supprimer" size="small" />
        </div>
      )}
    </div>
  );
}

CardPartenaire.propTypes = {
  id: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  logo: PropTypes.string,
  informations: PropTypes.string.isRequired,
  admin: PropTypes.bool,
};
