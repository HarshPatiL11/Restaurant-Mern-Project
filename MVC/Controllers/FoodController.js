import Foods from "../Models/FoodModel.js"; // Adjust the path as needed
import fs from "fs";

// Add food
export const addFood = async (req, res) => {
  try {
    const {
      foodTitle,
      foodDescription,
      foodPrice,
      foodTags,
      foodCategory,
      foodCode,
      foodIsAvailable,
      Restaurant,
      foodRating,
      foodRatingCount,
    } = req.fields;

    if (!foodTitle || !foodDescription || !foodPrice) {
      return res.status(400).send({
        success: false,
        message: "Food title, description, and price are required.",
      });
    }
    if (!Restaurant) {
      return res.status(400).send({
        success: false,
        message: "Restaurant id  is required.",
      });
    }

    let foodImages = [];
    let i = 0;
    while (req.files[`foodImage[${i}]`]) {
      const image = req.files[`foodImage[${i}]`];

      if (image.size > 1000000) {
        return res.status(400).send({
          error: "Each image should be less than 1 MB",
        });
      }

      const imageData = {
        data: fs.readFileSync(image.path),
        contentType: image.type,
      };

      foodImages.push(imageData); // Push each image to the array
      i++;
    }

    const newFood = new Foods({
      foodTitle,
      foodDescription,
      foodPrice,
      foodTags,
      foodCategory,
      foodCode,
      foodIsAvailable,
      foodImage: foodImages,
      Restaurant,
      foodRating,
      foodRatingCount,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "Food added successfully",
      food: newFood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "API Error, error in Add Food API",
      error: error.message,
    });
  }
};

// Get all foods
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Foods.find({});
    if (!foods.length) {
      return res.status(404).send({
        success: false,
        message: "No food items found.",
      });
    }

    // Convert image data to base64
    const foodsWithImage = foods.map((food) => ({
      ...food._doc,
      foodImage: food.foodImage.map((image) => ({
        data: `data:${image.contentType};base64,${image.data.toString(
          "base64"
        )}`,
        contentType: image.contentType,
      })),
    }));

    res.status(200).json({
      success: true,
      totalCount: foodsWithImage.length,
      foods: foodsWithImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "API Error, error in get All Food API",
      error: error.message,
    });
  }
};

// Get food by ID
export const getFoodById = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res
        .status(404)
        .send({ success: false, message: "Food id not in DataBase." });
    }
    const food = await Foods.findById(foodId);

    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food item not found." });
    }

    // Convert image data to base64
    const foodWithImage = {
      ...food._doc,
      foodImage: food.foodImage.map((image) => ({
        data: `data:${image.contentType};base64,${image.data.toString(
          "base64"
        )}`,
        contentType: image.contentType,
      })),
    };

    res.status(200).json({ success: true, food: foodWithImage });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "API Error, error in get Food by ID API",
      error: error.message,
    });
  }
};


export const getFoodByRestId = async (req, res) => {
  try {
    const RestId = req.params.id;
    if (!RestId) {
      return res
        .status(404)
        .send({ success: false, message: "Food id not in DataBase." });
    }
    const food = await Foods.find({ Restaurant: RestId });

    if (food.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Food items not found." });
    }

    // Convert image data to base64
    const foodWithImage = food.map((item) => ({
      ...item._doc,
      foodImage: item.foodImage.map((image) => ({
        data: `data:${image.contentType};base64,${image.data.toString(
          "base64"
        )}`,
        contentType: image.contentType,
      })),
    }));

    res.status(200).json({ success: true, food: foodWithImage });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "API Error, error in get Food by ID API",
      error: error.message,
    });
  }
};


// Update food
export const updateFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res
        .status(404)
        .send({ success: false, message: "Food ID is required." });
    }
    const food = await Foods.findById(foodId);
    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food not found." });
    }

    const {
      foodTitle,
      foodDescription,
      foodPrice,
      foodTags,
      foodCategory,
      foodCode,
      foodIsAvailable,
    } = req.fields;

    // Find the food by ID
    
    // Update the fields if provided
    if (foodTitle) food.foodTitle = foodTitle;
    if (foodDescription) food.foodDescription = foodDescription;
    if (foodPrice) food.foodPrice = foodPrice;
    if (foodTags) food.foodTags = foodTags;
    if (foodCategory) food.foodCategory = foodCategory;
    if (foodCode) food.foodCode = foodCode;
    if (foodIsAvailable !== undefined) food.foodIsAvailable = foodIsAvailable;

    // Handle image uploads
    if (req.files?.foodImage) {
      food.foodImage = []; // Reset images
      for (const foodImage of req.files.foodImage) {
        if (foodImage.size > 1000000) {
          return res
            .status(400)
            .send({ error: "Each image should be less than 1 MB" });
        }

        food.foodImage.push({
          data: fs.readFileSync(foodImage.path),
          contentType: foodImage.type,
        });
      }
    }

    await food.save();
    res.status(200).send({
      success: true,
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "API Error, error in update Food API",
      error: error.message,
    });
  }
};

// Delete food
export const deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res
        .status(404)
        .send({ success: false, message: "Food ID is required." });
    }

    const delFood = await Foods.findById(foodId);
    if (!delFood) {
      return res
        .status(404)
        .send({ success: false, message: "Food not found." });
    }

    await delFood.deleteOne();
    res.status(200).send({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "API Error, error in delete Food API",
      error: error.message,
    });
  }
};
