import axios from "axios";

const token = localStorage.getItem("DomaineDeLipica_token");

export default axios.create({
  timeout: 10000,
  baseURL: "https://domaine-de-lipica.onrender.com/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
