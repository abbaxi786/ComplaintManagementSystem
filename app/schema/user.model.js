import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  pic:{
    type: String,
    default: "/icons/profile.png"
  },
  phoneNo: {
    type: String,
    default: ""
  },
  
},{ timestamps: true },{strict: false });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;