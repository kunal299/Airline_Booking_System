import express from "express";
import {
  createFlight,
  deleteFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
} from "../controllers/flight.controller.js";

const flightRouter = express.Router();

flightRouter.get("/", getAllFlights);
flightRouter.post("/", createFlight);
flightRouter.get("/:id", getFlightById);
flightRouter.put("/:id", updateFlight);
flightRouter.delete("/:id", deleteFlight);

export default flightRouter;
