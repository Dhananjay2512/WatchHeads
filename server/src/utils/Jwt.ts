import jwt from "jsonwebtoken";
import { decodedType } from "../type";

const signJwt = (object: {}, options: {}) => {
  return jwt.sign(object, process.env.JWT_SECRET_KEY as string, {
    ...(options && options),
  });
};

const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as decodedType;
    return {
      decoded,
      expired: false,
    };
  } catch (error: any) {
    console.log(error);
    return {
      decoded: { userId: "", session: "" },
      expired: error.message === "jwt expired",
    };
  }
};

export { signJwt, verifyJwt };
