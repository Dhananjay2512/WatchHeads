import { ObjectId } from "mongoose";

interface resetPasswordModelType {
  entityId: string;
  resetString: string;
  createdAt: number;
  expiresAt: number;
}

interface clientInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface decodedType {
  userId: ObjectId;
  session: string;
}
