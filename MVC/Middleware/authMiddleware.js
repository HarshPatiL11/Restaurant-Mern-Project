import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config.js";

export const authMiddle = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decode) => {
      if (err) {
        console.log("JWT verification error:", err);
        return res.status(401).send({
          success: false,
          message: "Unauthorized User",
        });
      } else {
        console.log("Decoded JWT:", decode); 
           req.userId = decode.id; 
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR in API",
      error,
    });
  }
};
