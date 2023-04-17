import mongoose, { Schema, Types } from "mongoose";

export interface UserDocument extends mongoose.Document {
  user: Schema.Types.ObjectId;
  valid: Boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId instead of Types.ObjectId
      default: Types.ObjectId,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const sessionModel = mongoose.model<UserDocument>("Session", sessionSchema);
export { sessionModel };
