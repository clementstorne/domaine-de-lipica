import axios from "./http-common";

class CarouselService {
  static createImage = async (credentials) => {
    return axios.post("/carousel/", credentials);
  };

  static getAllImages = () => {
    return axios.get("/carousel/");
  };

  static getSingleImage = async (imageId) => {
    return axios.get(`/carousel/${imageId}`);
  };

  static updateImage = async (imageId, credentials) => {
    return axios.patch(`/carousel/${imageId}`, credentials);
  };

  static deleteImage = async (imageId) => {
    return axios.delete(`/carousel/${imageId}`);
  };
}

export default CarouselService;
