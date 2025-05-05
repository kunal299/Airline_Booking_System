import express from "express";
import {
  createFlight,
  decrementSeats,
  deleteFlight,
  getAllFlights,
  getFlightById,
  incrementSeats,
  searchFlight,
  updateFlight,
} from "../controllers/flight.controller.js";

const flightRouter = express.Router();

flightRouter.get("/", getAllFlights);
flightRouter.post("/", createFlight);
flightRouter.get("/search", searchFlight);
flightRouter.patch("/increment-seats/:flightId", incrementSeats);
flightRouter.patch("/decrement-seats/:flightId", decrementSeats);
flightRouter.get("/search", searchFlight);
flightRouter.get("/:id", getFlightById);
flightRouter.put("/:id", updateFlight);
flightRouter.delete("/:id", deleteFlight);

export default flightRouter;
