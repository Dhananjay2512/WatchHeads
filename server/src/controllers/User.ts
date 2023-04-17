import { NextFunction, Request, Response } from "express";

import { userModel } from "../models/User";
import { createSession } from "../services/Session";
import {
  createUser,
  findUser,
  sendResetEmail,
  validateUserPassword,
  upsertUser,
  reIssueAccessToken,
} from "../services/User";
// const { CreateErrorClass } = require("../utils/error");
import { signJwt, verifyJwt } from "../utils/Jwt";
import resetPasswordModel from "../models/ResetPassword";
import { compareHash, generateHash } from "../utils/bycrpt";
import { resetPasswordModelType } from "../type";

const accessTokenCookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenCookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

const userSignupHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const db_user = await findUser({ email: body.email });

    if (db_user) {
      return res.status(500).json({ status: "failure", message: "User already present" });
    }
    const user = await createUser(body);
    const user_obj = user.toObject();
    delete user_obj.password;
    // console.log(user_obj);
    res.status(200).json({ status: "success", data: user_obj });
  } catch (error) {
    console.log(error);
  }
};

const userLoginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userBody = req.body;
    const user = await userModel.findOne({ email: userBody.email });

    if (!user) return res.status(500).json({ status: "failure", message: "Invalid Email" });

    if (!userBody.password) {
      return res.status(500).json({ status: "failure", message: "Password is required" });
    }
    if (!validateUserPassword(userBody.password, user))
      return res.status(500).json({ status: "failure", message: "Invalid Password" });

    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = signJwt(
      {
        userId: user._id,
        session: session._id,
      },
      {
        expiresIn: process.env.ACCESS_TOKEN_TTL,
      }
    );

    const refreshToken = signJwt(
      {
        userId: user._id,
        session: session._id,
      },
      {
        expiresIn: process.env.REFRESH_TOKEN_TTL,
      }
    );

    // res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    // res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res
      .status(200)
      .json({ status: "success", data: { accessToken, refreshToken, user } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failure", message: "couldnt create session" });
  }
};

const sendResetUserPasswordEmailHandler = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const redirectUrl = req.body.redirectUrl;

    if (!user.verified) {
      res.status(500).json({ status: "failure", message: "User not verified" });
    }

    const newPasswordReturn = await sendResetEmail(user, redirectUrl);
    res.status(200).json({
      status: "Pending",
      message: "Resend Link sent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failure", message: "couldnt reset password" });
  }
};

const resetUserPasswordHandler = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const { resetSequence, newPassword } = req.body;

    const resetPasswordObject: resetPasswordModelType[] = await resetPasswordModel.find({
      entityId: userId,
    });

    if ((!resetPasswordObject.length as unknown as number) > 0) {
      return res
        .status(500)
        .json({ status: "failure", message: "Password Request not found" });
    }

    if (resetPasswordObject[0].expiresAt < Date.now()) {
      resetPasswordModel.deleteOne({ entityId: userId });
      return res.status(500).json({ status: "failure", message: "Password Request expired" });
    }

    const hashedResetSequence = resetPasswordObject[0].resetString;
    const token = await compareHash(resetSequence, hashedResetSequence);
    console.log(token);

    if (!token) {
      return res.status(500).json({ status: "failure", message: "Invalid Token" });
    }

    const hashedNewPassword = await generateHash(newPassword);
    const updatedUser = await upsertUser(
      { _id: userId },
      { password: hashedNewPassword },
      { new: true }
    );

    if (!updatedUser) {
      res.status(500).json({ status: "failure", message: "Password couldnt be changes" });
    }

    await resetPasswordModel.deleteOne({ entityId: userId });
    res.status(200).json({ status: "success", message: "Password was changed" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failure", message: "Problem in reseting password" });
  }
};

const refreshUserAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken;

    const { decoded, expired } = verifyJwt(refreshToken);

    const client = await userModel.findOne({ _id: decoded.userId });

    if (!client) {
      res.status(401).json({ status: "failure", message: "User doesn't exist" });
    }

    const accessToken = await reIssueAccessToken(refreshToken);
    res.status(200).json({
      status: "success",
      data: {
        accessToken,
        user: client,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// testing controller

export {
  userSignupHandler,
  userLoginHandler,
  sendResetUserPasswordEmailHandler,
  resetUserPasswordHandler,
  refreshUserAccessToken,
};
