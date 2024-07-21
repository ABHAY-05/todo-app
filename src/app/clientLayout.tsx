"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import {
  setCompleted,
  setImportant,
  setInCompleted,
  setTasks,
} from "@/actions/appActions";
import { fetchTasks } from "@/components/Tasks/taskActions";

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const userName = useSelector((state: RootState) => state.user.userName);

  const pathname = usePathname();
  const router = useRouter();

  const authRoutes = ["/login", "/signup", "/forgot-password", "/"];
  const isAuthRoute = authRoutes.includes(pathname);

  useEffect(() => {
    if (isLogin) {
      fetchTasks(userName)
        .then(({ tasks, completed, important, inCompleted }) => {
          dispatch(setTasks(tasks));
          dispatch(setCompleted(completed));
          dispatch(setImportant(important));
          dispatch(setInCompleted(inCompleted));
        })
        .catch((error) => {
          console.error(error.msg);
        });

      if (isAuthRoute) {
        router.push("/tasks");
      }
    } else if (!isAuthRoute) {
      router.push("/");
    }
  });

  return (
    <div className="global flex h-full gap-[2.5rem] p-[2.5rem] max-md:gap-[1rem] max-md:p-[1rem]">
      <Toaster position="top-center" reverseOrder={false} />
      {isLogin && <Sidebar />}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ClientLayout;
