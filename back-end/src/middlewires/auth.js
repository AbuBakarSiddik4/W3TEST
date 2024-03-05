import jwt from "jsonwebtoken";
import { JWTKEY } from "../secret.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token === null || token === "" || token === undefined) {
      throw { status: 401, message: "NO Access token Found" };
    }
    const decodedData = jwt.verify(token, JWTKEY);
    if (!decodedData) {
      throw { status: 402, message: "Invalid Access Token" };
    }
    req.decodedData = decodedData;
    next();
  } catch (error) {
    next(error);
  }
};

export const isAdmin = async(req,res,next) => {
  try {
      const { isAdmin } = req.decodedData;
      if(!isAdmin) {
        throw {
          status: 401,
          message: "Authentication failed",
        }
      }
      next();
  } catch (error) {
      next(error);
  }
}