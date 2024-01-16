import axios from "./http-common.js";

class EventService {
  static createEvent = async (credentials) => {
    return axios.post("/events/", credentials);
  };

  static getAllEvents = () => {
    return axios.get("/events/");
  };

  static getSingleEvent = async (eventId) => {
    return axios.get(`/events/${eventId}`);
  };

  static updateEvent = async (eventId, credentials) => {
    return axios.patch(`/events/${eventId}`, credentials);
  };

  static deleteEvent = async (eventId) => {
    return axios.delete(`/events/${eventId}`);
  };
}

export default EventService;
