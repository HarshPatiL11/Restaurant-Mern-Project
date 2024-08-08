import categorymodel from "../Models/Categorymodel.js";
import fs from "fs";
// add category
export const addCategory = async (req, res) => {
  try {
    const { catName } = req.fields;

    if (!catName) {
      return res.status(404).send({
        success: false,
        message: "Enter The Category Title",
      });
    }

    let catData = null;

    if (req.files?.catImage) {
      const catImage = req.files.catImage;
      if (catImage.size > 1000000) {
        return res.status(400).send({ error: "Logo should be less than 1 MB" });
      }

      catData = {
        data: fs.readFileSync(catImage.path),
        contentType: catImage.type,
      };
    }

    const newcategory = new categorymodel({
      catName,
      catImage: catData,
    });

    await newcategory.save();
    res
      .status(200)
      .send({ success: true, message: "Category added succesfully" });
  } catch (error) {
     res.status(500).json({
       success: false,
       message: "Api Error, error in Add Categery API",
       error: error.message,
     });
  }
};

// getAll
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categorymodel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories",
      });
    }
    // Convert image data to base64
    const categoriesWithImage = categories.map((category) => {
      const images = category.catImage.map((img) => ({
        data: img.data
          ? `data:${img.contentType};base64,${img.data.toString("base64")}`
          : null,
        contentType: img.contentType,
      }));

      return {
        ...category._doc,
        catImage: images, // Corrected field name
      };
    });

    res.status(200).json({
      success: true,
      totalCount: categoriesWithImage.length,
      categories: categoriesWithImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Api Error, error in get All category API",
      error: error.message,
    });
  }
};

// update

export const updateCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    if (!catId) {
      return res
        .status(404)
        .send({ success: false, message: "Id Not in Data base" });
    }
    const { catName } = req.fields; // Use req.fields to get the catName

    // Find the category by ID
    const category = await categorymodel.findById(catId);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // Update the category name if provided
    if (catName) {
      category.catName = catName;
    }

    // Check if there's an image to update
    if (req.files?.catImage) {
      const catImage = req.files.catImage;

      // Ensure the image is under the size limit
      if (catImage.size > 1000000) {
        return res
          .status(400)
          .send({ error: "Image should be less than 1 MB" });
      }

      // Replace the old image with the new one
      category.catImage = {
        data: fs.readFileSync(catImage.path),
        contentType: catImage.type,
      };
    }

    await category.save();

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Api Error, error in update category API",
      error: error.message,
    });
  }
};

// delete

export const deleteCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    if (!catId) {
      return res
        .status(404)
        .send({ success: false, message: "Id Not in Data base" });
    }
    const delCategory = await categorymodel.findById(catId);

    if (!delCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    await delCategory.deleteOne();

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Api Error, error in delete category API",
      error: error.message,
    });
  }
};
