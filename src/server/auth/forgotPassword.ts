"use server";

import User from "@/server/models/userSchema";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

type ForgetPassword = (
  userName: string,
  email: string,
  securityAnswer: string,
) => Promise<{ code: Number; msg: string }>;

type NewPassword = (
  userName: string,
  newPassword: string,
) => Promise<{ code: Number; msg: string }>;

export const handleForgotPassword: ForgetPassword = async (
  userName,
  email,
  securityAnswer,
) => {
  try {
    const user = await User.findOne({ userName: userName, email: email });

    if (!user) {
      return { code: 0, msg: "Invalid username or email" };
    }
    const isMatch = await bcrypt.compare(securityAnswer, user.securityInfo);

    if (!isMatch) {
      return { code: 0, msg: "Invalid Security Answer" };
    }

    return { code: 1, msg: "Create New Password" };
  } catch (err) {
    console.error(err instanceof Error && err.message);

    return { code: 0, msg: "Something went wrong. Please try again." };
  }
};

export const handleNewPassword: NewPassword = async (userName, newPassword) => {
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return { code: 0, msg: "Invalid email or password" };
    }

    user.password = newPassword;
    await user.save();

    const token = await user.generateAuthToken();
    const cookieStore = cookies();

    const maxAge = 30 * 24 * 60 * 60;
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      maxAge,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return { code: 1, msg: "Password Successfuly Updated!" };
  } catch (err) {
    console.error(err instanceof Error && err.message);

    return { code: 0, msg: "Something went wrong. Please try again." };
  }
};
