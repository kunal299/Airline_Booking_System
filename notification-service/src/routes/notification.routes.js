import express from "express";
import { sendNotification } from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.post("/notify", sendNotification);

export default notificationRouter;
