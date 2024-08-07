import fs from "fs";
import restrauntModel from "../Models/restrauntModel.js";

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

    if (!restTitle || restTitle.length < 3) {
      return res.status(404).send({
        success: false,
        message: "Title is necessary. Title must be longer than 3 letters",
      });
    }
    console.log(restTitle);

    // Parse restMenu
    const restMenu = [];
    let i = 0;
    while (req.fields[`restMenu[${i}][item]`]) {
      restMenu.push({
        item: req.fields[`restMenu[${i}][item]`],
        price: req.fields[`restMenu[${i}][price]`],
      });
      i++;
    }
    console.log(restMenu);
    if (!restTime) {
      return res.status(404).send({
        success: false,
        message: "Enter Restaurant Operating Time.",
      });
    }

    if (!restCode) {
      return res.status(404).send({
        success: false,
        message: "Enter Restaurant Code",
      });
    }

    let imagesData = [];
    if (req.files?.restImage) {
      // If restImage is not an array, convert it to an array
      const restImages = Array.isArray(req.files.restImage)
        ? req.files.restImage
        : [req.files.restImage];

      for (const image of restImages) {
        if (image.size > 1000000) {
          return res
            .status(400)
            .send({ error: "Each image should be less than 1 MB" });
        }
        const imageData = {
          data: fs.readFileSync(image.path),
          contentType: image.type,
        };
        imagesData.push(imageData);
      }
    }

    let logoData = "";
    if (req.files?.restLogo) {
      const restLogo = req.files.restLogo;
      if (restLogo.size > 1000000) {
        return res.status(400).send({ error: "Logo should be less than 1 MB" });
      }
      logoData = `data:${restLogo.type};base64,${fs
        .readFileSync(restLogo.path)
        .toString("base64")}`;
    }

    const parsedRestPickUp = restPickUp ? restPickUp.trim() === "true" : false;
    const parsedRestDilivary = restDilivary
      ? restDilivary.trim() === "true"
      : false;
    const parsedIsOpen = isOPen ? isOPen.trim() === "true" : false;

    const newRest = new restrauntModel({
      restTitle,
      restImage: imagesData,
      restMenu,
      restTime,
      restPickUp: parsedRestPickUp,
      restDilivary: parsedRestDilivary,
      isOPen: parsedIsOpen,
      restLogo: logoData,
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
    });

    await newRest.save();
    res.status(200).send({
      success: true,
      message: "Restaurant Added Successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};
