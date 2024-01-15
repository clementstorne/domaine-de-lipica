import axios from "./http-common.js";

class EventService {
  static createEvent = async (credentials) => {
    return axios.post("/stables/", credentials);
  };

  static getAllEvents = () => {
    return axios.get("/stables/");
  };

  static getSingleEvent = async (eventId) => {
    return axios.get(`/stables/${eventId}`);
  };

  static updateEvent = async (eventId, credentials) => {
    return axios.patch(`/stables/${eventId}`, credentials);
  };

  static deleteEvent = async (eventId) => {
    return axios.delete(`/stables/${eventId}`);
  };
}

export default EventService;
