import mongoose from "mongoose";

const restSchema = new mongoose.Schema(
  {
    restTitle: {
      type: String,
      required: [true, "Restaurant Title is required"], // Corrected spelling
    },
    restImage: {
      data: {
        type: Buffer,
      },
      contentType: {
        type: String,
      },
    },
    restMenu: {
      type: Array,
      required: [true, "Enter restaurant menu"], // Corrected spelling
    },
    restTime: {
      type: String,
      required: [true, "Restaurant Operating Timing is required"], // Corrected spelling
    },
    restPickUp: {
      type: Boolean,
      default: true,
    },
    restDilivary: {
      type: Boolean,
      default: true,
    },
    isOPen: {
      type: Boolean,
      default: true,
    },
    restLogo: {
      data: {
        type: Buffer,
      },
      contentType: {
        type: String,
      },
    },
    restRating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: Number, // Changed to Number for consistency
    },
    restCode: {
      type: String,
    },
    restCoords: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);

// export
export default mongoose.model("Restaurant", restSchema);
