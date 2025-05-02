import express from "express";
import {
  createFlight,
  getAllFlights,
} from "../controllers/flight.controller.js";

const flightRouter = express.Router();

flightRouter.get("/", getAllFlights);
flightRouter.post("/", createFlight);

export default flightRouter;
