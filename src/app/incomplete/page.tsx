"use client";

import Tasks from "@/components/Tasks/Tasks";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const InCompleted: React.FC = () => {
  const inCompleted = useSelector((state: RootState) => state.app.inCompleted);

  return <Tasks title="Incompleted Tasks" tasks={inCompleted} />;
};

export default InCompleted;
