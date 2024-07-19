"use client";

import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import handleLogin from "@/server/auth/login";
import Authenticate from "@/server/auth/authenticate";
import { setIsLogin, setUserName } from "@/actions/userActions";
import handleToast from "@/utils/toast";
import Link from "next/link";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    handleLogin(email.toLowerCase(), password)
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
          <h1 className="text-center text-2xl font-bold">Login to TodoApp</h1>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="on"
            placeholder="Enter your email address"
            className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
          />
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Enter your password"
            className="w-full rounded border border-[#3d3d3d] bg-[#2e2e2e] p-3 placeholder-[#a1a1a1] focus:border-[#00A3FF] focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-3 font-bold hover:bg-blue-700"
          >
            Login
          </button>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-500 underline"
          >
            Forgot your password?
          </Link>
          <Link
            href="/signup"
            className="mt-4 w-full rounded bg-green-500 py-3 text-center font-bold hover:bg-green-700"
          >
            Don't have an account yet? Sign Up
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
