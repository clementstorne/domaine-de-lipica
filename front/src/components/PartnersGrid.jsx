import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllPartners } from "../store/partnerSlice";
export default function PartnersGrid() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPartners());
  }, []);

  const partners = useSelector((state) => state.partners.partnersList);
  const error = useSelector((state) => state.partners.error);

  if (error) {
    return <></>;
  }
  return (
    <div className="flex flex-row flex-wrap justify-center m-4 md:m-8">
      {partners.map((partner) => (
        <div
          key={partner.id}
          className="flex items-center justify-center w-12 h-12 mb-2 mr-2 bg-white md:mb-4 md:mr-4 md:h-24 md:w-24"
        >
          <img
            src={partner.logo}
            alt={`Logo de ${partner.nom}`}
            className="object-fill"
          />
        </div>
      ))}
    </div>
  );
}
