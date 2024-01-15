import axios from "./http-common";

class PartnerService {
  static createPartner = async (credentials) => {
    return axios.post("/partners/", credentials);
  };

  static getAllPartners = () => {
    return axios.get("/partners/");
  };

  static getSinglePartner = async (partnerId) => {
    return axios.get(`/partners/${partnerId}`);
  };

  static updatePartner = async (partnerId, credentials) => {
    return axios.patch(`/partners/${partnerId}`, credentials);
  };

  static deletePartner = async (partnerId) => {
    return axios.delete(`/partners/${partnerId}`);
  };
}

export default PartnerService;
