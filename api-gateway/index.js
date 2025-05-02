import express from "express";
import dotenv from "dotenv";
import proxyRouter from "./routes/proxy.routes.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/", proxyRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
