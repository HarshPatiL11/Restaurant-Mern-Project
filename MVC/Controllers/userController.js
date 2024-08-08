import { comparePassword, hashPassword } from "../Helper/AuthHelper.js";
import UserModel from "../Models/UserModel.js";

// get

export const getAllUser = async (req, res) => {
  try {
    // const allUsers = await UserModel.find();
    // res.status(200).json(allUsers);
    console.log("User ID from token:", req.userId);
    const user = await UserModel.findById(req.userId);
    if (!user) return res.status(404).send("User not found"); // Handle not found case
    res.status(200).json(user); // Return the user
  } catch (error) {
    console.error(`Error getting mobile phones: ${error}`);
    res.status(500).send("Internal Server Error || error in get user API ");
  }
};

export const getUserByID = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await UserModel.findById(_id);
    if (user) return res.status(200).json(user);
    else return res.status(404).send("User not found");
  } catch (error) {
    console.error(`Error getting user by ID: ${error}`);
    res.status(500).send("Internal Server Error || Error in get user ID api");
  }
};

// update

export const userUpdateController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user)
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    const { userName, userAddress, userPhone } = req.body;

    if (userName) user.userName = userName;
    if (userAddress) user.userAddress = userAddress;
    if (userPhone) user.userPhone = userPhone;

    await user.save();
    res.status(200).send({
      success: true,
      message: "User Data Updated Successfully",
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error || error in Update API",
    });
  }
};

// reset password
export const resetPasswordControll = async (req, res) => {
  try {
    const { userEmail, newPassword, answer } = req.body;
    if (!userEmail || !newPassword || !answer) {
      return res
        .status(400)
        .send({ success: false, message: "Enter all details" });
    }
    const user = await UserModel.findOne({ userEmail, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const hashResetPass = await hashPassword(newPassword);
    user.userPassword = hashResetPass;
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Data Updated Successfully",
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error || error in reset Password API",
    });
  }
};

// Update password
export const updatePasswordControll = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .send({ success: false, message: "enter data password fields" });
    }

    const isMatch = await comparePassword(oldPassword, user.userPassword);
    if (!isMatch) {
      return res
        .status(400)
        .send("Old password is incorrect || Reset PassWord");
    }

    if (oldPassword === newPassword) {
      return res
        .status(400)
        .send("New password cannot be the same as your old password");
    }

    const hashUpdate = await hashPassword(newPassword);
    user.userPassword = hashUpdate;
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Password Updated Successfully",
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error || error in reset Password API",
    });
  }
};

// delete

export const userDelete = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (user) {
      await user.deleteOne();
      return res.status(200).send({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error || Error in Delete API",
    });
  }
};
