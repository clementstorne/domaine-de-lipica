"use server";

import { v2 as cloudinary } from "cloudinary";

export const deleteOldLogo = async (oldLogo: string) => {
  // const publicId = oldLogo.split("upload/")[1].split("/")[1].split(".")[0];

  await new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(oldLogo, function (error, result) {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};
