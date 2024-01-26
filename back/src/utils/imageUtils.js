import path from "path";
import { deleteFileError } from "../errors/customErrors";

const deleteImageFromDirectory = async (imageUrl) => {
  const filename = imageUrl.split("/")[1];

  try {
    const filePath = path.join(__dirname, `../../public/${filename}`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      console.error("File does not exist");
    }
  } catch (unlinkError) {
    console.error(deleteFileError, unlinkError);
    throw new Error(deleteFileError);
  }
};

export { deleteImageFromDirectory };
