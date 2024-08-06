import express from "express";
import {
  getAllUser,
  getUserByID,
  userUpdateController,
} from "../Controllers/userController.js";
import { authMiddle } from "../Middleware/authMiddleware.js";

const userRouter = express.Router();

// Routes
//Get USer Data;
userRouter.get("/allUser", authMiddle, getAllUser);
// userRouter.get("/:_id", authMiddle, getUserByID);
userRouter.put('/updateUser',authMiddle,userUpdateController)
// export
export default userRouter;
