"use server";

import { statfs, unlink } from "fs/promises";
import { join } from "path";

export const deleteOldLogo = async (oldLogo: string) => {
  const filename = oldLogo.split("/logos/")[1];
  const filePath = join(process.cwd(), "public/logos/", filename);
  if (await statfs(filePath)) {
    await unlink(filePath);
  }
};
