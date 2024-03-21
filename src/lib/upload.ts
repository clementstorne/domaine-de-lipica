export const formatImageFileName = (file: File) => {
  const MIME_TYPES: Record<string, string> = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/svg+xml": "svg",
    "image/webp": "webp",
  };

  const extension = MIME_TYPES[file.type];

  if (!extension) {
    throw new Error("Unsupported file type");
  }

  return file.name.split(".")[0].split(" ").join("-") + "." + extension;
};
