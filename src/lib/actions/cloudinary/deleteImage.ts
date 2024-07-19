"use server";

import { v2 as cloudinary } from "cloudinary";

export const deleteImage = async (imageId: string) => {
  await new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(imageId, function (error, result) {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};
