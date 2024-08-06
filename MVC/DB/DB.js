import mongoose from "mongoose";
import colors from "colors";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MongoDb_URl);
    console.log(
      `Connected to MongoDB server at ${conn.connection.host}`.bgWhite.white
    );
  } catch (error) {
    console.log(`MongoDB Error: ${error.message}`.bgRed);
    process.exit(1);
  }
};

export default connectDb;
