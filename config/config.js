// config.js
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URL = process.env.MongoDb_URl;
export const JWT_SECRET = process.env.JWT_SECRET;
