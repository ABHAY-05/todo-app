"use client";

import { FormEvent, useState } from "react";
import handleSignUp from "@/server/auth/signup";
import Authenticate from "@/server/auth/authenticate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setIsLogin, setUserName } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import handleToast from "@/utils/toast";
import Link from "next/link";
import "@/styles/Auth.css";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
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
      setIsLoading(false);
      handleToast(0, "Invalid email format!");
      return;
    }

    if (!passwordRegex.test(password)) {
      setIsLoading(false);
      handleToast(
        0,
        "Password must be at least 8 characters long and include at least one letter, one number and one special character!",
      );
      return;
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
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
          window.location.reload();
        } else {
          handleToast(0, msg);
        }
      })
      .catch(() => {
        handleToast(0, "Something went wrong!");
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center px-4 text-[#f8f8f8]">
        <form
          onSubmit={handleForm}
          className="form-container flex flex-col items-center gap-4 rounded-lg bg-[#1c1c1c] p-6 shadow-md"
        >
          <h1 className="form-header">Sign Up for TodoApp</h1>
          <div className="form-group">
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder=" "
              autoComplete="on"
              required
              className="form-control"
            />
            <label htmlFor="userName" className="form-label">
              Enter your User Name
            </label>
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" "
              autoComplete="on"
              required
              className="form-control"
            />
            <label htmlFor="email" className="form-label">
              Enter your email address
            </label>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              placeholder=" "
              required
              className="form-control"
            />
            <label htmlFor="password" className="form-label">
              Enter your password
            </label>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder=" "
              required
              className="form-control"
            />
            <label htmlFor="confirmPassword" className="form-label">
              Confirm your password
            </label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="securityInformation"
              id="securityInformation"
              placeholder=" "
              autoComplete="on"
              required
              className="form-control"
            />
            <label htmlFor="securityInformation" className="form-label">
              What is your favorite food?
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`form-button bg-green-500 text-white ${isLoading ? "opacity-50" : "opacity-100 hover:bg-green-700"}`}
          >
            Sign Up
          </button>
          <Link
            href="/login"
            className="form-button mt-4 bg-blue-500 text-center text-white hover:bg-blue-700"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
