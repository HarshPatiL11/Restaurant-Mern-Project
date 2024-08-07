import { PORT } from "./config/config.js";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import bodyParser from "body-parser";
import connectDb from "./MVC/DB/DB.js"; // Default import
import authrouter from "./MVC/Routes/authRoute.js";
import userRouter from "./MVC/Routes/userRouter.js";
import restRouter from "./MVC/Routes/restrauntRouter.js";

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

// listen
app.listen(PORT, () => {
  console.log(`Listening to port number ${PORT}`.bgGreen.white);
});

// call database
connectDb();