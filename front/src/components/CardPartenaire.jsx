import PropTypes from "prop-types";

import LinkButton from "../layouts/LinkButton";

import { newlineToBreakTag } from "../utils/strUtils";

export default function CardPartner(props) {
  return (
    <div className="blue-gradient mb-8 flex w-full max-w-88 flex-col flex-nowrap items-center justify-start rounded-10 p-4 text-gray-50 md:mx-2 md:max-w-112">
      <h3>{props.nom}</h3>
      <div className="flex w-full flex-col items-center justify-center md:flex-row md:justify-start">
        <div
          className={`my-4 flex h-40 w-40 items-center justify-center md:mr-4 ${
            props.logo ? "bg-white" : "bg-gray-400"
          }`}
        >
          {props.logo && (
            <img
              src={`/logos/${props.logo}`}
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
        <div className="mt-4 flex flex-row">
          <LinkButton
            link={"/administration/partenaires/" + props.id}
            label="Modifier"
            size="small"
            className="mr-4"
          />
          <LinkButton
            link={"/administration/partenaires/" + props.id}
            label="Supprimer"
            size="small"
            className="mr-4"
          />
        </div>
      )}
    </div>
  );
}

CardPartner.propTypes = {
  id: PropTypes.number.isRequired,
  nom: PropTypes.string.isRequired,
  logo: PropTypes.string,
  informations: PropTypes.string.isRequired,
  admin: PropTypes.bool,
};
