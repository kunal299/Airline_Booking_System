import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import { connectDB } from "../config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
