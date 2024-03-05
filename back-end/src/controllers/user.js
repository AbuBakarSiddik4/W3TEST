import jwt from 'jsonwebtoken';

import User from "../models/user.js";
import { JWTKEY } from "../secret.js";
import successResponse from "../utils/response.js";
import Transaction from '../models/transaction.js';

export const makeAdmin = async (req, res, next) => {
  const { decodedData } = req;
  try {
    const admin = await User.findByIdAndUpdate(
      { _id: decodedData.id },
      {
        $set: { isAdmin: true },
      },
      { new: true }
    );
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        isAdmin: admin.isAdmin,
      },
      JWTKEY
    );
    res.cookie("token", token);

    return successResponse(res, 200, "Change Made Sucessfully");
  } catch (error) {
    next(error);
  }
};

export const findUserTransaction = async (req, res, next) => {
  const { decodedData } = req;
  try {
    const data = await Transaction.find({ user: decodedData.id });
    return successResponse(res, 200, "Successfully Returned Data", data);
  } catch (error) {
    next(error);
  }
};
