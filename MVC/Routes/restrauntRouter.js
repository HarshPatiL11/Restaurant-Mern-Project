import express from "express";
import { createRestaurant, getAllRestaurant } from "../Controllers/restrauntController.js";
import { authMiddle } from "../Middleware/authMiddleware.js";
import formidable from "express-formidable";

const restRouter = express.Router();

restRouter.post("/newRestraunt", authMiddle, formidable(), createRestaurant);
restRouter.get("/getAllRest", authMiddle, formidable(), getAllRestaurant);

export default restRouter;