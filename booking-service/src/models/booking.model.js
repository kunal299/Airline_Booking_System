import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  seatsBooked: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
