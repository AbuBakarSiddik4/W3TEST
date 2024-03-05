import User from "../models/user.js";
import successResponse from "../utils/response.js";
export const users = async (req, res, next) => {
  try {
    const users = await User.find({},{password:0,isAdmin:0});
    return successResponse(res, 200, "All Registered User",users);
  } catch (error) {
    next(error);
  }
};
