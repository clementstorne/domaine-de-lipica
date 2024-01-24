import { jwtDecode } from "jwt-decode";

const isValidToken = (token) => {
  if (!token) {
    return false;
  }

  const decodedToken = jwtDecode(token);

  if (!decodedToken.admin) {
    return false;
  }

  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

export { isValidToken };
