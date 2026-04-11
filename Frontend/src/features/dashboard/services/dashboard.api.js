import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const createTask = async (newTask) => {
  const response = await api.post("/api/dashboard/tasks", newTask);
  return response.data;
};

export const fetchTasks = async () => {
  const response = await api.get("/api/dashboard/tasks");
  return response.data;
};

export const fetchProjects = async () => {
  const response = await api.get("/api/dashboard/projects");
  return response.data;
};
