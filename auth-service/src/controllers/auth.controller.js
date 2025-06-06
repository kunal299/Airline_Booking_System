import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  //Session begin
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password, role } = req.body;

    // Avoid registering the existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });
    await user.save({ session });

    // Session end
    await session.commitTransaction();
    session.endSession();

    // Response
    res.status(201).json({
      success: true,
      message: "User registered",
      data: {
        user: user,
      },
    });
  } catch (e) {
    // Aborting transaction incase of any error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};

export const login = async (req, res) => {
  //Session begin
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;

    // Avoid login for unregistered user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({
        success: false,
        message: "Invalid email",
      });
      return;
    }

    // Checking if the passwords are matching or not
    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword) {
      res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Jwt token creation
    const payload = { userId: existingUser._id, role: existingUser.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    // Session end
    await session.commitTransaction();
    session.endSession();

    // Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        user: existingUser,
      },
    });
  } catch (e) {
    // Aborting transaction incase of any error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      error: e.message,
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({
      message: "Refresh token not found",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken != refreshToken) {
      return res.status(400).json({
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = generateAccessToken({
      userId: user._id,
      role: user.role,
    });
    res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token not found",
    });
  }

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(204).send();
    }

    user.refreshToken = null;
    await user.save();

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
