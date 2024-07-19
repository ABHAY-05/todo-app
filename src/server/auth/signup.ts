"use server";

import User from "@/server/models/userSchema";
import { cookies } from "next/headers";

type SignUp = (
  userName: string,
  email: string,
  password: string,
  securityInformation: string,
) => Promise<{ code: number; msg: string }>;

const handleSignUp: SignUp = async (
  userName,
  email,
  password,
  securityInformation,
) => {
  try {
    const userNameRes = await User.findOne({ userName });
    if (userNameRes) {
      return { code: 0, msg: `Username ${userName} already taken!` };
    }

    const emailRes = await User.findOne({ email });
    if (emailRes) {
      return { code: 0, msg: `Email ${email} already registered!` };
    }

    const user = new User({
      userName,
      email,
      password,
      securityInfo: securityInformation,
    });

    const token = await user.generateAuthToken();
    await user.save();

    const cookieStore = cookies();
    const maxAge = 30 * 24 * 60 * 60;
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      maxAge,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return { code: 1, msg: "Registration Successful!" };
  } catch (error) {
    console.error(error instanceof Error && error.message);

    return { code: 0, msg: "Something went wrong. Please try again." };
  }
};

export default handleSignUp;
