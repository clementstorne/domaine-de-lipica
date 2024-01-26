import axios from "./http-common";

class ImageService {
  static deleteImage = async (imageUrl) => {
    const imageName = imageUrl.split("/")[1];
    return axios.delete(`/images/${imageName}`);
  };
}

export default ImageService;
