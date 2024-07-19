"use client";

import { FormEvent } from "react";
import handleSignUp from "@/server/auth/signup";
import Authenticate from "@/server/auth/authenticate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setIsLogin, setUserName } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import handleToast from "@/utils/toast";
import Link from "next/link";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const securityInformation = formData.get("securityInformation") as string;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]\/\\`~'_;+-=])[A-Za-z\d!@#$%^&*(),.?":{}|<>[\]\/\\`~'_;+-=]{8,}$/;

    if (!emailRegex.test(email)) {
      handleToast(0, "Invalid email format!");
      return;
    }

    if (!passwordRegex.test(password)) {
      handleToast(
        0,
        "Password must be at least 8 characters long and include at least one letter, one number and one special character!",
      );
      return;
    }

    if (password !== confirmPassword) {
      handleToast(0, "Passwords do not match!");
      return;
    }

    handleSignUp(
      userName,
      email.toLowerCase(),
      password,
      securityInformation.toLowerCase(),
    )
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
        <form
          onSubmit={handleForm}
          className="flex w-full max-w-md flex-col items-center gap-4 rounded-lg bg-[#1c1c1c] p-6 shadow-md"
        >
          <h1 className="text-2xl font-bold">Sign Up for TodoApp</h1>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Enter your User Name"
            autoComplete="on"
            required
            className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            autoComplete="on"
            required
            className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            required
            className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
          />
          <input
            type="text"
            name="securityInformation"
            id="securityInformation"
            autoComplete="on"
            placeholder="What is your favorite food?"
            required
            className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded bg-green-500 py-3 font-bold hover:bg-green-700"
          >
            Sign Up
          </button>
          <Link
            href="/login"
            className="mt-4 w-full rounded bg-blue-500 py-3 text-center font-bold hover:bg-blue-700"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
