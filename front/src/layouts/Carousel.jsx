import PropTypes from "prop-types";

import { useEffect, useState } from "react";

import { useSwipeable } from "react-swipeable";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Carousel(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [paused, setPaused] = useState(false);

  const breakpoint = 768;
  const minNumberPreviews = 5;
  const maxnNumberPreviews = 7;

  const shiftArrayToIndex = (arr, startIndex) => {
    const length = arr.length;

    if (startIndex < 0 || startIndex >= length) {
      return arr;
    }

    return arr.slice(startIndex).concat(arr.slice(0, startIndex));
  };

  const rotateToMiddle = (arr) => {
    const middle = Math.floor(arr.length / 2);
    const leftPart = arr.splice(0, middle);
    arr.push(...leftPart);
    return arr;
  };

  const getDesiredLengthArray = (arr, desiredLength) => {
    const rotatedArr = rotateToMiddle(arr);

    const middleIndex = Math.floor(arr.length / 2);

    if (desiredLength % 2 === 0) {
      return rotatedArr.slice(
        middleIndex - Math.floor(desiredLength / 2),
        middleIndex + Math.floor(desiredLength / 2),
      );
    } else {
      return rotatedArr.slice(
        middleIndex - Math.floor(desiredLength / 2),
        middleIndex + Math.floor(desiredLength / 2) + 1,
      );
    }
  };

  const getPreviewImages = (images, currentSlide, screenSize, breakpoint) => {
    if (images.length < 1) {
      return [];
    } else if (images.length <= 2) {
      return images;
    } else {
      const shiftedArray = shiftArrayToIndex(images, currentSlide);
      if (screenSize < breakpoint) {
        return getDesiredLengthArray(shiftedArray, minNumberPreviews);
      } else {
        return getDesiredLengthArray(shiftedArray, maxnNumberPreviews);
      }
    }
  };

  const handleSlideChange = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  const nextSlide = () => {
    if (currentSlide < props.images.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (currentSlide === props.images.length - 1) {
      setCurrentSlide(0);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (currentSlide == 0) {
      setCurrentSlide(props.images.length - 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowLeft") {
      previousSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  const handleArrowClick = (direction) => {
    if (direction === "left") {
      previousSlide();
    } else if (direction === "right") {
      nextSlide();
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => previousSlide(),
    onSwipedRight: () => nextSlide(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      if (!paused) {
        nextSlide();
      }
    }, 3000);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", handleResize);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentSlide]);

  return (
    <div className="relative w-full overflow-hidden">
      {props.preview && (
        <div className="my-2 flex flex-row flex-nowrap items-center justify-center">
          {getPreviewImages(
            props.images,
            currentSlide,
            windowWidth,
            breakpoint,
          ).map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className={`mx-1 h-8 cursor-pointer ${
                image.id === currentSlide
                  ? "border-4 border-blue-900 "
                  : "border-2 border-gray-50"
              }`}
              onClick={() => handleSlideChange(image.id)}
            />
          ))}
        </div>
      )}

      <div
        className="carousel-arrow left-6"
        onClick={() => handleArrowClick("left")}
        tabIndex="0"
        onKeyDown={(e) => e.key === "Enter" && handleArrowClick("left")}
      >
        <FaAngleLeft />
      </div>
      <div className="md:h-128 flex h-96 transition-transform duration-500 ease-in-out">
        {props.images.map((image, index) => (
          <div
            key={index}
            className={`flex w-full flex-col items-center justify-center overflow-hidden ${
              index !== currentSlide ? "hidden" : ""
            }`}
          >
            <img
              {...handlers}
              src={image.src || image}
              alt={image.alt}
              className="max-h-full max-w-full self-center justify-self-center object-fill"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            />
            {props.preview && (
              <p className="mb-8 text-center">{image.legend}</p>
            )}
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
    </div>
  );
}

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  preview: PropTypes.bool,
};
