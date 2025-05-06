import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Authorization header missing or invalid",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    req.headers["x-user-id"] = decoded.userId;
    // console.log(req.headers["x-user-id"]);
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or token expired",
    });
  }
};

export default authMiddleware;
