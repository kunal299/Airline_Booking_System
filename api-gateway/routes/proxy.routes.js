import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import {
  authServiceProxyHandler,
  flightServiceProxyHandler,
} from "../controllers/proxy.controller.js";

const proxyRouter = express.Router();

// Flight service
proxyRouter.get(
  "/flights",
  authMiddleware,
  roleMiddleware(["user", "admin"]),
  flightServiceProxyHandler
);

proxyRouter.post(
  "/flights",
  authMiddleware,
  roleMiddleware(["admin"]),
  flightServiceProxyHandler
);

proxyRouter.use("/auth", authServiceProxyHandler);

export default proxyRouter;
