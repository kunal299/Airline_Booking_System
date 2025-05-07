import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import {
  authServiceProxyHandler,
  bookingServiceProxyHandler,
  flightServiceProxyHandler,
  notificationServiceProxyHandler,
} from "../controllers/proxy.controller.js";

const proxyRouter = express.Router();

// Flight service
proxyRouter.get(
  "/flights",
  authMiddleware,
  roleMiddleware(["user", "admin"]),
  flightServiceProxyHandler
);

proxyRouter.patch(
  "/flights/increment-seats/:flightId",
  authMiddleware,
  roleMiddleware(["user", "admin"]),
  flightServiceProxyHandler
);

proxyRouter.patch(
  "/flights/decrement-seats/:flightId",
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

proxyRouter.get(
  "/flights/search",
  authMiddleware,
  roleMiddleware(["user", "admin"]),
  flightServiceProxyHandler
);

proxyRouter.get(
  "/flights/:id",
  authMiddleware,
  roleMiddleware(["user", "admin"]),
  flightServiceProxyHandler
);

proxyRouter.put(
  "/flights/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  flightServiceProxyHandler
);

proxyRouter.delete(
  "/flights/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  flightServiceProxyHandler
);

// Booking Service
proxyRouter.post(
  "/bookings",
  authMiddleware,
  roleMiddleware(["admin"]),
  bookingServiceProxyHandler
);

proxyRouter.post(
  "/bookings/cancel/:bookingId",
  authMiddleware,
  roleMiddleware(["admin"]),
  bookingServiceProxyHandler
);

// Notification Service
proxyRouter.post(
  "/notify",
  authMiddleware,
  roleMiddleware(["admin"]),
  notificationServiceProxyHandler
);

// Auth Service
proxyRouter.use("/auth", authServiceProxyHandler);

export default proxyRouter;
