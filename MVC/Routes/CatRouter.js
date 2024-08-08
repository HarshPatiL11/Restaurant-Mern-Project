import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../Controllers/CatController.js";
import formidable from "express-formidable";
import { authMiddle } from "../Middleware/AuthMiddleware.js";

const catrouter = express.Router();

// routers
// add ne category
catrouter.post("/Add", authMiddle, formidable(), addCategory);

//get all user
catrouter.get("/getAll", formidable(), getAllCategories);

// update category
catrouter.put("/update/:id", authMiddle, formidable(), updateCategory);

// delete
catrouter.delete("/delete/:id", authMiddle, deleteCategory);

// export
export default catrouter;
