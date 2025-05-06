import axios from "axios";
import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  const { flightId, seatsBooked } = req.body;

  if (!flightId || !seatsBooked) {
    return res.status(400).json({
      message: "Flight ID and seats are required",
    });
  }

  try {
    //Reserve seats
    await axios.patch(
      `http://localhost:4002/api/v1/flights/decrement-seats/${flightId}`,
      {
        count: seatsBooked,
      }
    );

    const booking = await Booking.create({
      user: req.headers["x-user-id"],
      flight: flightId,
      seatsBooked,
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (err) {
    try {
      await axios.patch(
        `http://localhost:4002/api/v1/flights/increment-seats/${flightId}`,
        {
          count: seatsBooked,
        }
      );
    } catch (rollbackError) {
      console.error(
        "Failed to rollback seat decrement:",
        rollbackError.message
      );
    }
    res.status(500).json({ message: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking already cancelled",
      });
    }

    // 1. Increment seats on the flight
    await axios.patch(
      `http://localhost:4002/api/v1/flights/increment-seats/${booking.flight}`,
      {
        count: booking.seatsBooked,
      }
    );

    // 2. Update booking status
    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled and seats restored",
      booking,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error cancelling the booking",
    });
  }
};
