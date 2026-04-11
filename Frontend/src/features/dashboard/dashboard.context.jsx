import { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <DashboardContext.Provider
      value={{ tasks, setTasks, projects, setProjects, loading, setLoading }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
