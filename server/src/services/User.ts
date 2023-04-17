import bcrypt from "bcrypt";
import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";
import { decode } from "punycode";
import { v4 } from "uuid";

import resetPasswordModel from "../models/ResetPassword";
import { sessionModel } from "../models/Session";
import { UserDocument } from "../models/User";
import { userModel } from "../models/User";
import { signJwt, verifyJwt } from "../utils/Jwt";
import { sendEmail, getHrTime } from "../utils/Mail";

const findUser = async (query: FilterQuery<UserDocument>) => {
  return await userModel.findOne(query);
};

const createUser = async (userBody: { email: string; password: string }) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userBody.password, salt);
  return await userModel.create({ ...userBody, password: hash });
};

const validateUserPassword = (password: string, user: UserDocument) => {
  const checkPassword = bcrypt.compareSync(password, user.password);
  return checkPassword;
};

const upsertUser = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: {}
) => {
  return await userModel.findOneAndUpdate(query, update, options);
};

const sendResetEmail = async (user: UserDocument, redirectUrl: string) => {
  const redirectSequence = v4();
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(redirectSequence, saltRounds);
    const newPasswordReset = await resetPasswordModel.create({
      entityId: user._id,
      resetString: hash,
      createdAt: Date.now(),
      expiresAt: getHrTime(),
    });

    await sendEmail(
      user.email,
      "Password Reset",
      `<p>We heard that you lost your password</p> 
      <p> Dont worry , use the link below to reset it </p>
      <p>  Press <a href = ${
        redirectUrl + "/" + user._id + "/" + redirectSequence
      }> here</a> to proceed</p>
      <p>This otp will expire after an hour</p>
      `
    );

    return newPasswordReset;
  } catch (error) {
    console.log(error);
  }
};

const reIssueAccessToken = async (refreshToken: string) => {
  let { decoded, expired } = verifyJwt(refreshToken);

  if (!decoded || !decoded.userId) return false;

  // console.log(decoded);

  const session = await sessionModel.findOne({ _id: decoded.session });

  // console.log(session);

  if (!session || !session.valid) return false;
  // console.log(session);
  const client = await findUser({ _id: session.user });

  if (!client) return false;

  const accessToken = signJwt(
    { client: client._id, session: session._id },
    { expiresIn: "2h" } // 15 minutes
  );

  return accessToken;
};

export {
  upsertUser,
  createUser,
  validateUserPassword,
  findUser,
  sendResetEmail,
  reIssueAccessToken,
};
