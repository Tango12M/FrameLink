import { useContext } from "react";
import {
  createTask,
  fetchTasks,
  fetchProjects,
} from "../services/dashboard.api";
import { DashboardContext } from "../dashboard.context";
import { toast } from "react-toastify";

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  const { loading, setLoading, setProjects, projects, tasks, setTasks } =
    context;

  async function handleCreateTask(newTask) {
    setLoading(true);
    try {
      const data = await createTask(newTask);
      setTasks([newTask, ...data.tasks]);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchTasks() {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data.saves);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

 async function handleCreateProject(newProject) {
    setLoading(true);
    try {
      // Make sure to import createProject from your api file!
      const data = await createProject(newProject); 
      setProjects([data.project, ...projects]); // Update projects state
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchProjects(query) {
    setLoading(true);
    try {
      const data = await fetchProjects(query);
      setProjects(data.results);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return {
    handleCreateTask,
    handleFetchTasks,
    handleCreateProject,
    handleFetchProjects,
    loading,
    projects,
    tasks,
  };
};
