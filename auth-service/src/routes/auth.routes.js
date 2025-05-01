import express, { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Token is valid!", user: req.user });
});

export default authRouter;
