import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
