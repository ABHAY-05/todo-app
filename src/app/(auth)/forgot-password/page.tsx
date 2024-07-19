"use client";

import { FormEvent, useState } from "react";
import {
  handleForgotPassword,
  handleNewPassword,
} from "@/server/auth/forgotPassword";
import handleToast from "@/utils/toast";
import Link from "next/link";
import Authenticate from "@/server/auth/authenticate";
import { setIsLogin, setUserName } from "@/actions/userActions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<"verify" | "reset">("verify");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState<{
    newPassword: string;
    confirmNewPassword: string;
  }>({ newPassword: "", confirmNewPassword: "" });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleVerification = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userName = formData.get("username") as string;
    const email = formData.get("email") as string;
    const securityAnswer = formData.get("securityAnswer") as string;

    const { code, msg } = await handleForgotPassword(
      userName,
      email,
      securityAnswer,
    );

    if (code === 1) {
      setUsername(userName);
      setStep("reset");
    } else {
      handleToast(0, msg);
    }
  };

  const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newPassword = formData.get("newPassword") as string;
    const confirmNewPassword = formData.get("confirmNewPassword") as string;

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]\/\\`~'_;+-=])[A-Za-z\d!@#$%^&*(),.?":{}|<>[\]\/\\`~'_;+-=]{8,}$/;

    if (newPassword !== confirmNewPassword) {
      handleToast(0, "Passwords do not match!");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      handleToast(
        0,
        "Password must be at least 8 characters long and include at least one letter, one number and one special character!",
      );
      return;
    }

    handleNewPassword(username, newPassword)
      .then(({ code, msg }) => {
        if (code === 1) {
          Authenticate().then(({ userName, isAuthenticated }) => {
            dispatch(setIsLogin(isAuthenticated));
            dispatch(setUserName(userName));
          });
          router.push("/");
          handleToast(1, msg);
        } else {
          handleToast(0, msg);
        }
      })
      .catch(() => {
        handleToast(0, "Something went wrong!");
      })
      .finally(() => window.location.reload());
  };

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center px-4 text-[#f8f8f8]">
        {step === "verify" ? (
          <form
            onSubmit={handleVerification}
            className="flex w-full max-w-md flex-col items-center gap-4 rounded-lg bg-[#1c1c1c] p-6 text-center shadow-md"
          >
            <h1 className="text-2xl font-bold">Verify Your Identity</h1>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              autoComplete="on"
              required
              className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              autoComplete="on"
              required
              className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
            />
            <input
              type="text"
              name="securityAnswer"
              placeholder="Answer to your security question"
              autoComplete="on"
              required
              className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded bg-blue-500 py-3 font-bold hover:bg-blue-700"
            >
              Verify
            </button>
          </form>
        ) : (
          <form
            onSubmit={handlePasswordReset}
            className="flex w-full max-w-md flex-col items-center gap-4 rounded-lg bg-[#1c1c1c] p-6 text-center shadow-md"
          >
            <h1 className="text-2xl font-bold">Reset Your Password</h1>
            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              autoComplete="new-password"
              placeholder="Enter your new password"
              required
              onChange={(e) => {
                setPassword({
                  ...password,
                  newPassword: e.target.value,
                });
              }}
              className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
            />
            <input
              type="password"
              name="confirmNewPassword"
              value={password.confirmNewPassword}
              autoComplete="new-password"
              placeholder="Confirm your new password"
              required
              onChange={(e) => {
                setPassword({
                  ...password,
                  confirmNewPassword: e.target.value,
                });
              }}
              className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded bg-green-500 py-3 font-bold hover:bg-green-700"
            >
              Reset Password
            </button>
          </form>
        )}
        <Link href="/login" className="mt-4 text-sm text-blue-500 underline">
          Back to Login
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
