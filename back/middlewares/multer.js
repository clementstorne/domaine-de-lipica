import multer from "multer";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/svg+xml": "svg",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0].split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const singleMulter = multer({ storage }).single("image");
const multipleMulter = multer({ storage }).array("images");

export { singleMulter, multipleMulter };

export default multer({ storage }).single("image");
