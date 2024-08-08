import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import { comparePassword, hashPassword } from "../Helper/AuthHelper.js";

const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", JWT_SECRET);

// add user
export const registerUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userAddress, userPhone ,answer } =
req.body;

    // validate input
    if (!userName) {
      return res.status(400).send("Enter your name");
    }
    if (!userEmail) {
      return res.status(400).send("Enter your email id");
    }
    if (!userPassword) {
      return res.status(400).send("Enter your Password");
    }
    if (!userAddress) {
      return res.status(400).send("Enter your Password");
    }
    if (!userPhone) {
      return res.status(400).send("Enter your Password");
    }
    if (!answer) {
      return res.status(400).send("enter a answer for password reset QnA");
    }

    // check is user exist
    const chkExisting = await UserModel.findOne({ userEmail });
    if (chkExisting) {
      return res.status(400).send("Email already registered");
    }
    const hashedPassword = await hashPassword(userPassword);

    // Create user
    const newUser = await UserModel.create({
      userName,
      userEmail,
      userPassword: hashedPassword,
      userAddress,
      userPhone,
      answer, 
    });
    // const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1hr" });
    // Send response
    return res.status(201).send({
      status: "success",
      message: "User registered successfully",
      user: newUser,
      // token,
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    return res.status(500).send("Internal Server Error");
  }
};

// User login controller
export const userLoginController = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    // Validation
    if (!userEmail || !userPassword) {
      return res.status(400).send("Email and password are required");
    }

    // Check if user exists
    const user = await UserModel.findOne({ userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if password matches
    const isMatch = await comparePassword(userPassword, user.userPassword);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    user.userPassword = undefined;  
    res.status(200).send({
      status: "success",
      message: "User logged in successfully",
      token,user,
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};



export const userLogoutController = async (req, res) => {
  try {
   const user = await UserModel.findById(req.userId);
   if (!user) {
     return res.status(404).send({
       success: false,
       message: "User not found",
     });
   }
    res.status(200).send({
      success: true,
      message:
        "User logged out successfully. Please clear your token on the client side.",
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error || Error in Logout API",
    });
  }
};