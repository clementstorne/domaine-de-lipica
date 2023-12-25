import PropTypes from "prop-types";

import { useEffect, useState } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Carousel(props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowLeft" && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (e.key === "ArrowLeft" && currentSlide == 0) {
      setCurrentSlide(props.images.length - 1);
    } else if (
      e.key === "ArrowRight" &&
      currentSlide < props.images.length - 1
    ) {
      setCurrentSlide(currentSlide + 1);
    } else if (
      e.key === "ArrowRight" &&
      currentSlide === props.images.length - 1
    ) {
      setCurrentSlide(0);
    }
  };

  const handleArrowClick = (direction) => {
    if (direction === "left" && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (direction === "left" && currentSlide === 0) {
      setCurrentSlide(props.images.length - 1);
    } else if (
      direction === "right" &&
      currentSlide < props.images.length - 1
    ) {
      setCurrentSlide(currentSlide + 1);
    } else if (
      direction === "right" &&
      currentSlide === props.images.length - 1
    ) {
      setCurrentSlide(0);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentSlide]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="carousel-arrow left-6"
        onClick={() => handleArrowClick("left")}
        tabIndex="0"
        onKeyDown={(e) => e.key === "Enter" && handleArrowClick("left")}
      >
        <FaAngleLeft />
      </div>
      <div className="flex transition-transform duration-500 ease-in-out">
        {props.images.map((image, index) => (
          <div
            key={index}
            className={`w-full aspect-4/3 overflow-hidden ${
              index !== currentSlide ? "hidden" : ""
            }`}
          >
            <p className="mb-2 text-center">{image.legend}</p>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full aspect-4/3"
            />
          </div>
        ))}
      </div>
      <div
        className="carousel-arrow right-0"
        onClick={() => handleArrowClick("right")}
        tabIndex="0"
        onKeyDown={(e) => e.key === "Enter" && handleArrowClick("right")}
      >
        <FaAngleRight />
      </div>

      {props.preview && (
        <div className="mt-2 flex flex-row flex-nowrap justify-center items-center">
          {props.images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`h-8 mx-1 cursor-pointer ${
                index === currentSlide
                  ? "border-4 border-blue-900 "
                  : "border-2 border-gray-50"
              }`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  preview: PropTypes.bool,
};
