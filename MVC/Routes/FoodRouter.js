import express from "express";
import formidable from "express-formidable";
import { authMiddle } from "../Middleware/AuthMiddleware.js";
import { addFood, deleteFood, getAllFoods, getFoodById, getFoodByRestId, updateFood } from "../Controllers/FoodController.js";
import { orderStatusController, placeOrderController } from "../Controllers/OrderController.js";
import adminMiddleware from "../Middleware/AdminMiddleware.js";

const foodRouter = express.Router();

// routers
// add new Food item
foodRouter.post("/Add", authMiddle, formidable(),addFood);

//get all food
foodRouter.get("/getAll", formidable(), getAllFoods);
foodRouter.get("/get/:id", formidable(), getFoodById);
foodRouter.get("/byRestaurant/:id", formidable(), getFoodByRestId);


// update food item
foodRouter.put("/update/:id", authMiddle, formidable(),updateFood);

// delete
foodRouter.delete("/delete/:id", authMiddle,deleteFood);

// Order food APIS
// placeOrder
foodRouter.post("/placeorder", authMiddle, placeOrderController);

// Check Order Status
foodRouter.post(
  "/orderStatus/:id",
  authMiddle,
  adminMiddleware,
  orderStatusController
);



// export
export default foodRouter;
