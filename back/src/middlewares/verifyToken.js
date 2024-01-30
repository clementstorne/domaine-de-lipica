import jwt from "jsonwebtoken";

const extractBearer = (authorization) => {
  if (typeof authorization !== "string") {
    return null;
  }
  const matches = authorization.match(/bearer\s+(\S+)/i);
  return matches ? matches[1] : null;
};

const verifyToken = (req, res, next) => {
  console.log("ok");
  const token =
    req.headers.authorization && extractBearer(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
      } else {
        return res.status(401).json({ error: "Authentication failed" });
      }
    }

    if (!decodedToken.admin) {
      return res
        .status(403)
        .json({ error: "Access forbidden: Admin access required" });
    }

    req.auth = decodedToken;
    next();
  });
};

export default verifyToken;
