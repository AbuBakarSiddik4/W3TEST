import crypto from "crypto";

import Transaction from "../models/transaction.js";
import User from "../models/user.js";
import successResponse from "../utils/response.js";

const hashURL = (url) => {
  const hash = crypto.createHash("sha256");
  hash.update(url);
  const fullHash = hash.digest("hex");
  const shortHash = fullHash.slice(0, 10);
  return shortHash;
};

export const addnewone = async (req, res, next) => {
  const {
    body: { wallet },
    decodedData,
  } = req;
  try {
    if (!wallet) {
      throw {
        status: 402,
        message: "No Wallet Address Found",
      };
    }
    const data = new Transaction({ 
      hash: hashURL(wallet),
      user: decodedData.id,
    });
    await data.save();
    return successResponse(res, 201, "sucessfully created", { data });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { wallet_id } = req.query;
    if (!wallet_id) {
      throw {
        status: 404,
        message: "No wallet_id found",
      };
    }
    await Transaction.findByIdAndDelete({ _id: wallet_id });
    successResponse(res, 200, "SucessFully Removed");
  } catch (error) {
    next(error);
  }
};
