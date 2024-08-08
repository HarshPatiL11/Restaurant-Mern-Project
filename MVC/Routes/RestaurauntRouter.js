import express from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurant,
  getRestaurantById,
} from "../Controllers/RestaurauntController.js";
import { authMiddle } from "../Middleware/AuthMiddleware.js";
import formidable from "express-formidable";

const restRouter = express.Router();

restRouter.post("/Add", authMiddle, formidable(), createRestaurant);
restRouter.get("/get/All", formidable(), getAllRestaurant);
restRouter.get("/get/:id", formidable(), getRestaurantById);
restRouter.delete('/delete/:id',authMiddle,deleteRestaurant);

export default restRouter;