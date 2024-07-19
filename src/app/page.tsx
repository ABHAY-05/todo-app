"use client";

import Tasks from "@/components/Tasks/Tasks";
import UnAuth from "@/components/UnAuth";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.app.tasks);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  const pathname = usePathname();
  const isAuthRoute = ["/login", "/signup", "/forgot-password"].includes(
    pathname,
  );

  return !isLogin && !isAuthRoute ? (
    <UnAuth />
  ) : (
    <Tasks title="All Tasks" tasks={tasks} />
  );
};

export default Home;
