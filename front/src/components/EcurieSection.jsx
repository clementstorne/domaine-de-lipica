import PropTypes from "prop-types";

import { Carousel } from "./index";

export default function EcurieSection(props) {
  return (
    <>
      <h1>{props.stable.nom}</h1>

      <section className="mb-8 md:mb-16">
        <p className="mb-4">{props.stable.informations}</p>
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
