import axios from "./http-common.js";

class AuthService {
  static signup = async (credentials) => {
    return axios.post("/auth/signup", credentials);
  };

  static login = async (credentials) => {
    return axios.post("/auth/login", credentials);
  };
}

export default AuthService;
