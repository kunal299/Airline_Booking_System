import express from "express";
import cors from "cors";
import { connectDB } from "../config/db.js";
import bookingRouter from "./routes/booking.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/v1/bookings", bookingRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
