"use client";

import { CldImage } from "next-cloudinary";

type CloudinaryImageProps = {
  id: string;
  alt: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
};

const CloudinaryImage = ({
  id,
  alt,
  size = 800,
  width,
  height,
  className,
}: CloudinaryImageProps) => {
  return (
    <CldImage
      width={size ? size : width}
      height={size ? size : height}
      src={id}
      alt={alt}
      className={className}
    />
  );
};

export default CloudinaryImage;
