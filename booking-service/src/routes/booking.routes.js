import express from "express";
import {
  cancelBooking,
  createBooking,
} from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.post("/cancel/:bookingId", cancelBooking);

export default bookingRouter;
