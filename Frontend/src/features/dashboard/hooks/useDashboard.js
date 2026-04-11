import { useContext } from "react";
import {
  createProject,
  getMyProjects,
  getScenesByProject,
  createScene,
} from "../services/dashboard.api";
import { DashboardContext } from "../dashboard.context";
import { toast } from "react-toastify";

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  const { loading, setLoading, setProjects, tasks, setTasks, projects } = context;

  async function handleCreateProject(newProject) {
    setLoading(true);
    try {
      const data = await createProject(newProject);
      const project = data.project || data;
      setProjects([{ ...project, id: project._id }, ...(projects || [])]);
      toast.success(data.message || "Project created successfully");
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchProjects() {
    setLoading(true);
    try {
      const data = await getMyProjects();
      const projectList = data.projects || data;
      setProjects(
        Array.isArray(projectList)
          ? projectList.map((project) => ({
              ...project,
              id: project._id,
            }))
          : [],
      );
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchScenes(projectId) {
    if (!projectId) return;
    setLoading(true);
    try {
      const data = await getScenesByProject(projectId);
      const scenes = data.scenes || data;
      setTasks(
        Array.isArray(scenes)
          ? scenes.map((scene) => ({
              ...scene,
              id: scene._id,
            }))
          : [],
      );
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to load scenes",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateScene(formData, config = {}) {
    setLoading(true);
    try {
      const data = await createScene(formData, config);
      const scene = data.scene || data;
      setTasks((prevTasks = []) => [
        { ...scene, id: scene._id },
        ...prevTasks,
      ]);
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to upload scene",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    handleCreateProject,
    handleFetchProjects,
    handleFetchScenes,
    handleCreateScene,
    loading,
    projects,
    tasks,
    setTasks
  };
};
