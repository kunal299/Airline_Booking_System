import express from "express";
import {
  createFlight,
  getAllFlights,
} from "../controllers/flight.controller.js";
import { authMiddleware } from "../middlewares/flight.middleware.js";

const flightRouter = express.Router();

flightRouter.get("/", authMiddleware, getAllFlights);
flightRouter.post("/", authMiddleware, createFlight);

export default flightRouter;
