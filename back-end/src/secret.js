import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;

export const DBURL = process.env.DBURL;

export const JWTKEY = process.env.JWTKEY;
