import express from "express";
import {
  getAllUser,
  getUserByID,
  userUpdateController,
  resetPasswordControll,
  updatePasswordControll,
  userDelete,
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

// PASSWORDS
// reset password
userRouter.put("/resetPassword", authMiddle, resetPasswordControll);
// update
userRouter.put("/updatePassword", authMiddle, updatePasswordControll);

{/*DElETE USER */}
userRouter.delete("/removeUser", authMiddle, userDelete);
// export
export default userRouter;
