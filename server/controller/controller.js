import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signupUser = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(404).json({
        message: "user already existed",
      });
    }
    const hashPasword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      username: username,
      password: hashPasword,
    });

    res.status(200).json({
      message: "signup successfull",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "error while signUp the user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({
        message: "user need to signup",
      });
    }
    const matchPasword = await bcrypt.compare(password, existingUser.password);
    if (!matchPasword) {
      return res.status(404).json({
        message: "password didnot match",
      });
    }
    const token = jwt.sign(existingUser.toJSON(), process.env.SECRET_KEY);
    res.status(200).json({
      message: "login successfull",
      existingUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "error while user login",
      error: error.message,
    });
  }
};
