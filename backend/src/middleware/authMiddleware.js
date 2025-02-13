import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  // Expect 'Authorization: Bearer <token>'
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Malformed Authorization header" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    // Optionally attach decoded user data to request
    req.user = decoded;
    next();
  });
};

export default authMiddleware;
