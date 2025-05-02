import express from "express";
import cors from "cors";
import { connectDB } from "../config/db.js";

const app = express();

app.use(cors());
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
