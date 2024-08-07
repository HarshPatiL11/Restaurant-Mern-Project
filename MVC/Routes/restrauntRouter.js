import express from "express";
import { createRestaurant, getAllRestaurant, getRestaurantById } from "../Controllers/restrauntController.js";
import { authMiddle } from "../Middleware/authMiddleware.js";
import formidable from "express-formidable";

const restRouter = express.Router();

restRouter.post("/newRestraunt", authMiddle, formidable(), createRestaurant);
restRouter.get("/getAll", formidable(), getAllRestaurant);
restRouter.get("/get/:id", formidable(), getRestaurantById);

export default restRouter;