import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { JWTKEY } from "../secret.js";
import successResponse from "../utils/response.js";

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw {
        status: 404,
        message: "User Email/Password Is Undefined",
      };
    }
    // Check if email exist already.

    const doesEmailExist = await User.findOne({ email: email });
    if (doesEmailExist) {
      throw {
        status: 409,
        message: "User Already Exist",
      };
    }
    // if not save the user.
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new User({ email: email, password: hashPassword });
    await user.save();

    return successResponse(res, 201, "Sucessfully Created User");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw {
        status: 404,
        message: "User Email/Password Is Undefined",
      };
    }
    const user = await User.findOne({ email: email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw {
        status: 404,
        message: "Email/Password Does't Match",
      };
    }
    // Exclude password from response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    const token = await jwt.sign(
      {
        id: userWithoutPassword._id,
        email: userWithoutPassword.email,
        isAdmin: userWithoutPassword.isAdmin,
      },
      JWTKEY,{
        expiresIn: '10h',
      }
    );
    res.cookie("token", token);
    return successResponse(
      res,
      200,
      "Sucessfully Created User",
      {user:userWithoutPassword,acess_token:token}
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return successResponse(res, 200, "Log out Successful");
  } catch (error) {
    next(error);
  }
};
