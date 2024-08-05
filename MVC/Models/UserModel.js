const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: [true, "name is required"],
  },
  userEmail: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
  },
  userPassword: {
    type: String,
    require: [true, "Password is required"],
  },
  userAddress: {
    type: Array,
  },
  userPhone: {
    type: String,
    require: [true, "Phone is required"],
  },
  userType: {
    type: String,
    require: [true, "user Type required"],
    default: "client",
    enum: ["client", "admin", "vender", "driver"],
  },
  profile: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
  },
},{timestamps:true});

// export
module.exports = mongoose.model('User',userSchema)
