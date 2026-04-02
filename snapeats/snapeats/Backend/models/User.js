import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
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
    required: false
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },

  mobile: {
    type: String,
    required: false
  },

  loginTime: {
    type: Date
  },

  logoutTime: {
    type: Date
  },

  loginDuration: {
    type: String
  }, 

  offerSent: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);