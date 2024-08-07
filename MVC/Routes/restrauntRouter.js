import express from "express";
import { createRestraunt } from "../Controllers/restrauntController.js";
import { authMiddle } from "../Middleware/authMiddleware.js";

const restRouter = express.Router();

restRouter.post('/newRestraunt',authMiddle,createRestraunt);

export default restRouter;