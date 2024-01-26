import multer from "multer";
import path from "path";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/svg+xml": "svg",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (_, file, callback) => {
    callback(null, path.join(__dirname, "../../public"));
  },
  filename: (_, file, callback) => {
    const name = file.originalname.split(".")[0].split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const singleMulter = multer({ storage }).single("image");
const multipleMulter = multer({ storage }).array("images");

export { multipleMulter, singleMulter };

export default multer({ storage }).single("image");
