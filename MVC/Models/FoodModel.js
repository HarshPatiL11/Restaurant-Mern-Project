import mongoose from "mongoose";

// Schema
const foodSchema = new mongoose.Schema(
  {
    foodTitle: {
      type: String,
      required: [true, "Food Title is required"],
    },
    foodDescription: {
      type: String,
      required: [true, "Food description is required"],
    },
    foodPrice: {
      type: Number,
      required: [true, "Food price is required"],
    },
    foodImage: [
      {
        data: {
          type: Buffer,
          required: false,
        },
        contentType: {
          type: String,
          required: false,
        },
      },
    ],
    foodTags: {
      type: String,
    },
    foodCategory: {
      type: String,
    },
    foodCode: {
      type: String,
    },
    foodIsAvailable: {
      type: Boolean,
      default: true,
    },
    Restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    foodRating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    foodRatingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

// Export
export default mongoose.model("Foods", foodSchema);
