import express from "express";
import {
  getAllUser,
  getUserByID,
  userUpdateController,
  resetPasswordControll,
  updatePasswordControll,
  userDelete,
} from "../Controllers/UserController.js";
import { authMiddle } from "../Middleware/AuthMiddleware.js";

const userRouter = express.Router();

// Routes
//Get USer Data via token;
userRouter.get("/allUser", authMiddle, getAllUser);


// get user form id passed in url
// userRouter.get("/:_id", authMiddle, getUserByID);

// update
userRouter.put('/updateUser',authMiddle,userUpdateController)

// PASSWORDS
// reset password
userRouter.put("/resetPassword", authMiddle, resetPasswordControll);
// update
userRouter.put("/updatePassword", authMiddle, updatePasswordControll);

{/*DElETE USER */}
userRouter.delete("/removeUser", authMiddle, userDelete);

export default userRouter;
