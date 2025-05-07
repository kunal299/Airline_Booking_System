import axios from "axios";
import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  const { flightId, seatsBooked, email } = req.body;

  if (!flightId || !seatsBooked || !email) {
    return res.status(400).json({
      message: "Flight ID, seats and email are required",
    });
  }

  try {
    // 1. Reserve seats
    await axios.patch(
      `http://localhost:4002/api/v1/flights/decrement-seats/${flightId}`,
      {
        count: seatsBooked,
      }
    );

    // 2. Creating booking
    const booking = await Booking.create({
      user: req.headers["x-user-id"],
      flight: flightId,
      seatsBooked,
    });

    // 3. Send mail
    await axios.post("http://localhost:4004/api/v1/notify", {
      email,
      subject: "Regarding your recent booking",
      flightId,
      seatsBooked,
      action: "booking",
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
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

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

    // 3. Send mail
    await axios.post("http://localhost:4004/api/v1/notify", {
      email,
      subject: "Regarding your recent booking",
      flightId: booking.flight,
      seatsBooked: booking.seatsBooked,
      action: "cancel",
    });

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
