"use client";

import Tasks from "@/components/Tasks/Tasks";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

function AllTasks() {
  const tasks = useSelector((state: RootState) => state.app.tasks);

  return <Tasks title="All Tasks" tasks={tasks} />;
}

export default AllTasks;
