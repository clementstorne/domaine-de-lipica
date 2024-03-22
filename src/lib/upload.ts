"use server";

export const formatImageFileName = (originalFileName: string, type: string) => {
  const MIME_TYPES: Record<string, string> = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/svg+xml": "svg",
    "image/webp": "webp",
  };

  const extension = MIME_TYPES[type];

  if (!extension) {
    throw new Error("Unsupported file type");
  }

  const fileName = originalFileName
    .toLowerCase()
    .split(".")[0]
    .split(" ")
    .join("-");

  return fileName + "." + extension;
};
