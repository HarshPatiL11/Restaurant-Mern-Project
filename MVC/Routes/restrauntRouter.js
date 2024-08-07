import express from "express";
import { createRestaurant } from "../Controllers/restrauntController.js";
import { authMiddle } from "../Middleware/authMiddleware.js";
import formidable from "express-formidable";

const restRouter = express.Router();

restRouter.post("/newRestraunt", authMiddle, formidable(), createRestaurant);

export default restRouter;