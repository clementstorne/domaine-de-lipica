import axios from "./http-common.js";

class StrableService {
  static createStable = async (credentials) => {
    return axios.post("/stables/", credentials);
  };

  static getAllStables = () => {
    return axios.get("/stables/");
  };

  static getSingleStable = async (stableId) => {
    return axios.get(`/stables/${stableId}`);
  };

  static updateStable = async (stableId, credentials) => {
    return axios.patch(`/stables/${stableId}`, credentials);
  };

  static deleteStable = async (stableId) => {
    return axios.delete(`/stables/${stableId}`);
  };
}

export default StrableService;
