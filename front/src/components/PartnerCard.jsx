import PropTypes from "prop-types";

import { newlineToBreakTag } from "../utils/strUtils";

export default function PartnerCard(props) {
  return (
    <div className="rounded-10 blue-gradient max-w-88 md:max-w-112 mb-8 flex w-full flex-col flex-nowrap items-center justify-start p-4 text-gray-50 md:mx-2">
      <h3>{props.nom}</h3>
      <div className="flex w-full flex-col items-center justify-center md:flex-row md:justify-start">
        <div
          className={`my-4 flex h-40 w-40 items-center justify-center object-fill md:mr-4 ${
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
    </div>
  );
}

PartnerCard.propTypes = {
  nom: PropTypes.string.isRequired,
  logo: PropTypes.string,
  informations: PropTypes.string.isRequired,
};
