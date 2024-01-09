import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/partners";
const token = localStorage.getItem("DomaineDeLipica_token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

class PartnerService {
  static createPartner = async (credentials) => {
    return axios.post("/", credentials);
  };

  static getAllPartners = () => {
    return axios.get("/");
  };

  static getSinglePartner = async (eventId) => {
    return axios.get(`/${eventId}`);
  };

  static updatePartner = async (eventId, credentials) => {
    return axios.patch(`/${eventId}`, credentials);
  };

  static deletePartner = async (eventId) => {
    return axios.delete(`/${eventId}`);
  };
}

export default PartnerService;
