import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  console.log("Headers: ", req.headers);
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Access denied: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};
