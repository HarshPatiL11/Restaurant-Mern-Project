import { PORT } from "./config/config.js";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import bodyParser from "body-parser";
import connectDb from "./MVC/DB/DB.js"; // Default import
// router imports 
import authrouter from "./MVC/Routes/AuthRoute.js";
import userRouter from "./MVC/Routes/UserRouter.js";
import restRouter from "./MVC/Routes/RestaurauntRouter.js";
import catrouter from "./MVC/Routes/CatRouter.js";
import foodRouter from "./MVC/Routes/FoodRouter.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send(`<h1> hello port ${PORT}</h1>`);
});

// api routing
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/restraunts", restRouter);
app.use("/api/v1/category", catrouter);
app.use("/api/v1/food/", foodRouter);

// listen
app.listen(PORT, () => {
  console.log(`Listening to port number ${PORT}`.bgGreen.white);
});

// call database
connectDb();