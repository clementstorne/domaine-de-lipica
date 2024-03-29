"use server";

import { statfs, unlink } from "fs/promises";
import { join } from "path";

export const deleteImageFile = async (imageUrl: string) => {
  const filename = imageUrl.split("/carousel/")[1];
  const filePath = join(process.cwd(), "public/carousel/", filename);
  if (await statfs(filePath)) {
    await unlink(filePath);
  }
};
