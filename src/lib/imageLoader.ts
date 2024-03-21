import fs from "fs";
import path from "path";

const logosDirectory = path.join(process.cwd(), "public/logos");

export const getLogosPaths = () => {
  const paths: Record<string, string> = {};
  const files = fs.readdirSync(logosDirectory);
  files.forEach((file) => {
    if (file.match(/\.(png|jpe?g|svg|webp)$/)) {
      paths[file] = "/logos/" + file;
    }
  });
  return paths;
};
