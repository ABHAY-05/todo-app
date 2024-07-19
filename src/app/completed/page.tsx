"use client";

import Tasks from "@/components/Tasks/Tasks";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Completed: React.FC = () => {
  const completed = useSelector((state: RootState) => state.app.completed);

  return <Tasks title="All Tasks" tasks={completed} />;
};

export default Completed;