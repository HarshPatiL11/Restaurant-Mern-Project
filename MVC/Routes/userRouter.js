import express from "express";
import {
  getAllUser,
  getUserByID,
  userUpdateController,
  resetPasswordControll,
} from "../Controllers/userController.js";
import { authMiddle } from "../Middleware/authMiddleware.js";

const userRouter = express.Router();

// Routes
//Get USer Data via token;
userRouter.get("/allUser", authMiddle, getAllUser);


// get user form id passed in url
// userRouter.get("/:_id", authMiddle, getUserByID);

// update
userRouter.put('/updateUser',authMiddle,userUpdateController)

// reset password
userRouter.put("/resetPassword", authMiddle, resetPasswordControll);



// export
export default userRouter;
