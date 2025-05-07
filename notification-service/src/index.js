import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notificationRouter from "./routes/notification.routes.js";
import { transporter } from "../config/mail.config.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", notificationRouter);

transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter failed: ", error);
  } else {
    console.log("Email transporter working");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
