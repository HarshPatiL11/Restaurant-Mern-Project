import fs from "fs";
import restrauntModel from "../Models/RestrauntModel.js";

export const createRestaurant = async (req, res) => {
  try {
    const {
      restTitle,
      restTime,
      restPickUp,
      restDilivary,
      isOPen,
      restRating,
      ratingCount,
      restCode,
      restCoords = {}, // Add default value to avoid destructuring undefined
    } = req.fields;
    const {
      id,
      latitude,
      latitudeDelta,
      longitude,
      longitudeDelta,
      address,
      title,
    } = restCoords;

    // Validate restaurant title
    if (!restTitle || restTitle.length < 3) {
      return res.status(404).send({
        success: false,
        message: "Title is necessary. Title must be longer than 3 letters",
      });
    }

    // Validate operating time
    if (!restTime || restTime.length < 5) {
      // Example: 09:00 AM
      return res.status(404).send({
        success: false,
        message: "Enter valid Restaurant Operating Time (e.g., '09:00 AM').",
      });
    }

    // Validate restaurant code
    if (!restCode || restCode.length < 3) {
      return res.status(404).send({
        success: false,
        message: "Enter valid Restaurant Code (at least 3 characters).",
      });
    }

    // Parse restMenu
    const restMenu = [];
    let i = 0;
    while (req.fields[`restMenu[${i}][item]`]) {
      const item = req.fields[`restMenu[${i}][item]`];
      const price = req.fields[`restMenu[${i}][price]`];

      // Validate menu item
      if (!item || item.length < 3) {
        return res.status(404).send({
          success: false,
          message: `Menu item at index ${i} is required and must be longer than 3 letters.`,
        });
      }

      // Validate menu item price
      if (!price || isNaN(price) || price <= 0) {
        return res.status(404).send({
          success: false,
          message: `Price for menu item '${item}' must be a valid positive number.`,
        });
      }

      restMenu.push({
        item,
        price: parseFloat(price), // Ensure price is a number
      });
      i++;
    }

    // Validate pickup, delivery, and open status
    const parsedRestPickUp = restPickUp ? restPickUp.trim() === "true" : false;
    const parsedRestDilivary = restDilivary
      ? restDilivary.trim() === "true"
      : false;
    const parsedIsOpen = isOPen ? isOPen.trim() === "true" : false;

    // Parse restImage
    let restImage = [];
    i = 0;
    while (req.files[`restImage[${i}]`]) {
      const image = req.files[`restImage[${i}]`];
      if (image.size > 1000000) {
        return res.status(400).send({
          error: "Each image should be less than 1 MB",
        });
      }

      const imageData = {
        data: fs.readFileSync(image.path),
        contentType: image.type,
      };

      restImage.push(imageData);
      i++;
    }

    let logoData = null;

    if (req.files?.restLogo) {
      const restLogo = req.files.restLogo;
      if (restLogo.size > 1000000) {
        return res.status(400).send({ error: "Logo should be less than 1 MB" });
      }

      logoData = {
        data: fs.readFileSync(restLogo.path), 
        contentType: restLogo.type,
      };
    }

    // Create new restaurant instance with all data
    const newRest = new restrauntModel({
      restTitle,
      restMenu,
      restTime,
      restPickUp: parsedRestPickUp,
      restDilivary: parsedRestDilivary,
      isOPen: parsedIsOpen,
      restRating,
      ratingCount,
      restCode,
      restCoords: {
        id,
        latitude,
        latitudeDelta,
        longitude,
        longitudeDelta,
        address,
        title,
      },
      restImage, // Include the images array
      restLogo: logoData, // Include the logo data
    });

    await newRest.save();

    res.status(200).send({
      success: true,
      message: "Restaurant Added Successfully",
      newRest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};


export const getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await restrauntModel.find({});

    // Convert image data to base64
    const restWithImg = restaurants.map((restaurant) => {
      const images = restaurant.restImage.map((img) => ({
        data: img.data
          ? `data:${img.contentType};base64,${img.data.toString("base64")}`
          : null,
        contentType: img.contentType,
      }));

      return {
        ...restaurant._doc,
        restImage: images,
      };
    });

    res.status(200).json({
      success: true,
      totalCount: restWithImg.length,
      restWithImg,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
        success: false,
        message: "Internal server error || error in get restraunt All api",error
      });
  }
};


// get restaurant by Id
export const getRestaurantById = async (req, res) => {
  try {
    const restId = req.params.id; // Change this line to extract ID correctly
      if (!restId) {
        return res.status(404).send({
          success: false,
          message: "Please Provide Restraunt Id",
        });
      }
    const restaurant = await restrauntModel.findById(restId); // Fetch restaurant by ID

    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Convert image data to base64 for the single restaurant
    const images = restaurant.restImage.map((img) => ({
      data: img.data
        ? `data:${img.contentType};base64,${img.data.toString("base64")}`
        : null,
      contentType: img.contentType,
    }));

    const restWithImg = {
      ...restaurant._doc,
      restImage: images,
    };

    res.status(200).json({
      success: true,
      totalCount: 1, // Returning 1 for a single restaurant
      restWithImg,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal server error || error in get restaurant by id API",
      error,
    });
  }
};

// delete restraunt

export const deleteRestaurant = async (req, res) => {
  try {
    const restId = req.params.id; // Change this line to extract ID correctly
    if (!restId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Restraunt Id",
      });
    }
    const restaurant = await restrauntModel.findById(restId); // Fetch restaurant by ID

    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    await restaurant.deleteOne();
    res.status(200).send({
      success: true,
      message:"Restaurant data Deleted Successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal server error || error In Delete Restraunt API",
      error,
    });
  }
};