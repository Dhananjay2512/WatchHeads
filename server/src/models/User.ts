import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    username: {
      type: String,
      required: [true, "Name is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    phone: {
      type: Number,
      required: [true, "Phone number is required"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export { userModel, userSchema };
