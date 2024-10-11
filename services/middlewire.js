// middlewares
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Check if the token is in the correct Bearer format
  const tokenParts = authHeader.split(" ");
  if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
    return res.status(401).json({ message: "Malformed authorization header" });
  }

  const token = tokenParts[1];

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // Differentiate between various token errors
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(401).json({ message: "Unauthorized access" });
      }
    }

    // Attach decoded token to the request object
    req.decoded = decoded;
    next();
  });
};

module.exports = { verifyToken };
