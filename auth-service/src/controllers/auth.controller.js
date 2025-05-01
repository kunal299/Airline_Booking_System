import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const register = async (req, res) => {
  //Session begin
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;

    // Avoid registering the existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(
      {
        email,
        password: hashedPassword,
      },
      { session }
    );

    // Jwt token creation
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Session end
    await session.commitTransaction();
    session.endSession();

    // Response
    res.status(201).json({
      success: true,
      message: "User registered",
      data: {
        token,
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
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Session end
    await session.commitTransaction();
    session.endSession();

    // Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
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
