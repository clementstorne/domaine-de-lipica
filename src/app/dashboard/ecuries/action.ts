"use server";

import { statfs, unlink } from "fs/promises";
import { join } from "path";

export const deleteImages = async (imagesList: string[]) => {
  for (const image of imagesList) {
    const filename = image.split("/ecuries/")[1];
    const filePath = join(process.cwd(), "public/ecuries/", filename);
    if (await statfs(filePath)) {
      await unlink(filePath);
    }
  }
};
