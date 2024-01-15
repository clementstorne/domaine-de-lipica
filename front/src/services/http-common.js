import axios from "axios";

const token = localStorage.getItem("DomaineDeLipica_token");

export default axios.create({
  timeout: 10000,
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
