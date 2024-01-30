import PropTypes from "prop-types";

import { Carousel } from "./index";

export default function EcurieSection(props) {
  const paragraphes = props.stable
    ? props.stable.informations
        .split("\n\n")
        .map((schedule) => schedule.split("\n").join("<br />"))
    : "";

  return (
    <>
      <h1>{props.stable.nom}</h1>

      <section>
        {paragraphes.map((schedule, index) => (
          <p
            key={index}
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: `${schedule}` }}
          />
        ))}

        {props.stable.images.length > 0 && (
          <div className="mx-auto md:w-3/4 lg:w-1/2">
            <Carousel images={props.stable.images} />
          </div>
        )}
      </section>
    </>
  );
}

EcurieSection.propTypes = {
  stable: PropTypes.object,
};
