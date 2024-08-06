import mongoose from "mongoose";

const restSchema = new mongoose.Schema(
  {
    restTitle: {
      type: String,
      required: [true, "REsraunt Title is required"],
    },
    restImage: [
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
    restMenu: {
      type: Array,
      required: [true, "Enter restraunt menu"],
    },
    restTime: {
      type: String,
      required: [true, "Restraunt Oprating Timing is required"],
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
        required: false,
      },
      contentType: {
        type: String,
        required: false,
      },
    },
    restRating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
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
