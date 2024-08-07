import fs from "fs";
import restrauntModel from "../Models/restrauntModel.js";

export const createRestraunt = async (req, res) => {
  try {
    const {
      restTitle,
      restMenu,
      restTime,
      restPickUp,
      restDilivary,
      isOPen,
      restRating,
      ratingCount,
      restCode,
      restCoords,
    } = req.body;
    const {
      id,
      latitude,
      latitudeDelta,
      longitude,
      longitudeDelta,
      address,
      title,
    } = restCoords;
    // Check if req.files exists
    const { restImage, restLogo } = req.files;

    // const restImage = req.files?.restImage; // Use optional chaining to avoid errors
    // const restLogo = req.files?.restLogo; // Use optional chaining to avoid errors

    if (!restTitle || restTitle.length < 3) {
      return res.status(404).send({
        success: false,
        message: "Title is necessary. Title must be longer than 3 letters",
      });
    }
    if (!restMenu) {
      return res.status(404).send({
        success: false,
        message: "Enter Restaurant Menu.",
      });
    }
    if (restPickUp === undefined) {
      return res.status(404).send({
        success: false,
        message: "Mention if PickUp Available, Set to True By Default",
      });
    }
    if (!restTime) {
      return res.status(404).send({
        success: false,
        message: "Enter Restaurant Operating Time.",
      });
    }
    if (restDilivary === undefined) {
      return res.status(404).send({
        success: false,
        message:
          "Mention if home delivery services Available, Set to True By Default",
      });
    }
    if (!restCode) {
      return res.status(404).send({
        success: false,
        message: "Enter Restaurant Code",
      });
    }

    const newRest = new restrauntModel({
      restTitle,
      restMenu,
      restTime,
      restPickUp,
      restDilivary,
      isOPen,
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

    // Handle restImage if it exists
    if (restImage) {
      if (restImage.size > 1000000) {
        return res
          .status(400)
          .send({ error: "Image should be less than 1 MB" });
      }
    }

    let imageData = "";
    if (restImage) {
      imageData = `data:${restImage.type};base64,${fs
        .readFileSync(restImage.path)
        .toString("base64")}`;
    }

    // Handle restLogo if it exists

    if (restLogo) {
      if (restLogo.size > 1000000) {
        return res.status(400).send({ error: "Logo should be less than 1 MB" });
      }
      let logoData = "";
      if (restLogo) {
        logoData = `data:${restLogo.type};base64,${fs
          .readFileSync(restLogo.path)
          .toString("base64")}`;
      }
    }

    await newRest.save();
    res.status(200).send({
      success: true,
      message: "Restaurant Added Successfully",
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
