import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    catName: {
      type: String,
      required: [true, "category Name is required"],
    },
    catImage: [
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
  },
  { timestamps: true }
);

export default mongoose.model("category", categorySchema);
