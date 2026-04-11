import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const getMyProjects = async () => {
  const response = await api.get("/api/project/my");
  return response.data;
};

export const createProject = async (payload) => {
  const response = await api.post("/api/project/create", payload);
  return response.data;
};

export const addProjectMember = async (payload) => {
  const response = await api.post("/api/project/add-member", payload);
  return response.data;
};

export const updateProjectMemberRole = async (payload) => {
  const response = await api.patch("/api/project/update-role", payload);
  return response.data;
};

export const getScenesByProject = async (projectId) => {
  const response = await api.get(`/api/scene/${projectId}`);
  return response.data;
};

export const createScene = async (formData, config = {}) => {
  const response = await api.post("/api/scene/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  });
  return response.data;
};

export const getComments = async (sceneId) => {
  const response = await api.get(`/api/comment/${sceneId}`);
  return response.data;
};

export const addComment = async (payload) => {
  const response = await api.post("/api/comment/add", payload);
  return response.data;
};

export const getTasksByScene = async (sceneId) => {
  const response = await api.get(`/api/task/${sceneId}`);
  return response.data;
};

export const createTaskFromComment = async (payload) => {
  const response = await api.post("/api/task/from-comment", payload);
  return response.data;
};

export const updateTaskStatus = async (payload) => {
  const response = await api.patch("/api/task/status", payload);
  return response.data;
};

export const getSceneDetails = async (sceneId) => {
  const response = await api.get(`/api/scene/detail/${sceneId}`);
  return response.data;
};

export const assignScene = async (payload) => {
  const response = await api.patch("/api/scene/assign", payload);
  return response.data;
};

export const updateSceneVideo = async (sceneId, formData, config = {}) => {
  const response = await api.patch(`/api/scene/${sceneId}/video`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  });
  return response.data;
};

export const createInviteLink = async (payload) => {
  const response = await api.post("/api/invite/create", payload);
  return response.data;
};

export const acceptInvite = async (payload) => {
  const response = await api.post("/api/invite/accept", payload);
  return response.data;
};

export const getInviteDetails = async (token) => {
  const response = await api.get(`/api/invite/${token}`);
  return response.data;
};
