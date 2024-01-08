import axios from "./http-common";

class EventService {
  static createEvent = async (credentials) => {
    // const token = localStorage.getItem("Learn@Home_token");
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.post("/events", credentials);
  };

  static getAllEvents = () => {
    // const token = localStorage.getItem("Learn@Home_token");
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.get("/events/");
  };

  static getSingleTask = async (eventId) => {
    //   const token = localStorage.getItem("Learn@Home_token");
    //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.get(`/events/${eventId}`);
  };

  static updateEvent = async (eventId, credentials) => {
    //   const token = localStorage.getItem("Learn@Home_token");
    //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.patch(`/events/${eventId}`, credentials);
  };

  static deleteEvent = async (eventId) => {
    //   const token = localStorage.getItem("Learn@Home_token");
    //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.delete(`/events/${eventId}`);
  };
}

export default EventService;
