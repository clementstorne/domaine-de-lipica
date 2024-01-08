import axios from "axios";

export default axios.create({
  timeout: 10000,
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
});
