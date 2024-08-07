import express from "express";
import { createRestaurant, deleteRestaurant, getAllRestaurant, getRestaurantById } from "../Controllers/restrauntController.js";
import { authMiddle } from "../Middleware/authMiddleware.js";
import formidable from "express-formidable";

const restRouter = express.Router();

restRouter.post("/newRestraunt", authMiddle, formidable(), createRestaurant);
restRouter.get("/getAll", formidable(), getAllRestaurant);
restRouter.get("/get/:id", formidable(), getRestaurantById);
restRouter.delete('/delete/:id',authMiddle,deleteRestaurant);

export default restRouter;