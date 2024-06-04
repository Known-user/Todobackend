import { user } from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {
  try {
    const allusers = await user.find();
    res.json({
      success: true,
      allusers,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyDetail = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;
    let newuser = await user.findOne({ email });

    if (newuser) return next(new ErrorHandler("User Already Exist", 400));

    const hashpassword = await bcrypt.hash(password, 10);
    newuser = await user.create({
      name,
      password: hashpassword,
      email,
    });

    sendCookie(newuser, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userr = await user.findOne({ email }).select("+password");

    if (!userr) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, userr.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(userr, res, `Welcome Back ${userr.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", { 
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: false,
      message: "logout successfull",
    });
};
