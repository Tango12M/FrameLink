import { useState, useEffect } from "react";
import {
  Layout,
  Folder,
  Users,
  LogOut,
  X,
  UploadCloud,
  FileVideo,
  Menu,
  Bell,
} from "lucide-react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useDashboard } from "../hooks/useDashboard";

// Shared Components
import ThemeToggle from "../../shared/components/ThemeToggle";
import SearchBar from "../../shared/components/SearchBar";
import SearchModal from "../../shared/components/SearchModal";
import { useAuth } from "../../auth/hooks/useAuth";

// REMOVED onOpenVideo from props, defined natively inside instead
const Dashboard = ({ toggleNotif }) => {
  const navigate = useNavigate();

  const {
    handleCreateProject,
    handleFetchProjects,
    handleFetchScenes,
    handleCreateScene,
    loading,
    projects,
    tasks,
    setTasks
  } = useDashboard();
  const { handleLogout } = useAuth();

  const [activeProject, setActiveProject] = useState(null);
  const [localTasks, setLocalTasks] = useState(tasks || []);
  const [sceneTitle, setSceneTitle] = useState("");
  const [sceneFile, setSceneFile] = useState(null);

  const statusLabel = {
    raw: "Raw Footage",
    editing: "Editing",
    review: "In Review",
    approved: "Ready",
  };
  const labelToStatus = {
    "Raw Footage": "raw",
    Editing: "editing",
    "In Review": "review",
    Ready: "approved",
  };

  useEffect(() => {
    handleFetchProjects();
  }, []);

  useEffect(() => {
    if (projects && projects.length > 0 && !activeProject) {
      setActiveProject(projects[0]);
    }
  }, [projects, activeProject]);

  useEffect(() => {
    if (activeProject?.id) {
      handleFetchScenes(activeProject.id);
    } else {
      setLocalTasks([]);
    }
  }, [activeProject]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      setLocalTasks(tasks);
    }
  }, [tasks]);

  const handleMoveTask = (taskId, newStatus) => {
    setLocalTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const handleUploadScene = async () => {
    if (!activeProject) {
      toast.error("Select a project before uploading footage.");
      return;
    }
    if (!sceneTitle.trim()) {
      toast.error("Please enter a scene title.");
      return;
    }
    if (!sceneFile) {
      toast.error("Please choose an MP4 video file.");
      return;
    }
    if (
      sceneFile.type !== "video/mp4" &&
      !sceneFile.name.toLowerCase().endsWith(".mp4")
    ) {
      toast.error("Only MP4 video files are allowed.");
      return;
    }
    if (sceneFile.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 10MB.");
      return;
    }

    const formData = new FormData();
    formData.append("projectId", activeProject.id);
    formData.append("title", sceneTitle);
    formData.append("video", sceneFile);
    setUploadProgress(0);

    try {
      await handleCreateScene(formData, {
        onUploadProgress: (progressEvent) => {
          const total =
            progressEvent.total ||
            progressEvent?.nativeEvent?.total ||
            progressEvent?.loaded ||
            1;
          const percent = Math.min(
            100,
            Math.round((progressEvent.loaded * 100) / total),
          );
          setUploadProgress(percent);
        },
      });
      setSceneTitle("");
      setSceneFile(null);
      setIsModalOpen(false);
      toast.success("Scene uploaded successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload scene",
      );
    } finally {
      setUploadProgress(0);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSceneFile(file);
  };

  // --- NEW: Routing for the Video Review page ---
  const onOpenVideo = (task) => {
    navigate(`/video/${task.id}`);
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  const columns = ["Raw Footage", "Editing", "In Review", "Ready"];

  const handleGlobalMouseMove = (e) =>
    setMousePos({ x: e.clientX, y: e.clientY });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleConfirmLogout = async () => {
    setIsLogoutModalOpen(false);
    const result = await handleLogout();
    if (result?.success) {
      navigate("/landing");
    }
  };

  return (
    <div
      onMouseMove={handleGlobalMouseMove}
      className="min-h-screen bg-neutral-100 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-50 font-sans selection:bg-neutral-500/30 overflow-hidden flex flex-col relative transition-colors duration-700"
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300 opacity-0 dark:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.03), transparent 80%)`,
        }}
      />

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsLogoutModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-[fadeIn_0.2s_ease-out] flex flex-col items-center text-center z-10">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-4 text-red-500 border border-red-100 dark:border-red-900/50">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-neutral-900 dark:text-white mb-2">
              Ready to leave?
            </h3>
            <p className="text-neutral-500 text-sm mb-6">
              Are you sure you want to log out of FrameLink?
            </p>
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-sm"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !uploadProgress && setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-8 w-full max-w-lg shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-white">
                Upload Footage
              </h3>
              {!uploadProgress && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
            {uploadProgress === 0 ? (
              <div className="space-y-6">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Upload an MP4 video for the active project. The backend
                  accepts up to 10MB per upload.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Scene Title
                    </label>
                    <input
                      type="text"
                      value={sceneTitle}
                      onChange={(e) => setSceneTitle(e.target.value)}
                      placeholder="e.g. Scene 1 - Opening"
                      className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-shadow placeholder:text-neutral-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Video File
                    </label>
                    <input
                      type="file"
                      accept="video/mp4"
                      onChange={handleFileChange}
                      className="w-full text-sm text-neutral-700 dark:text-neutral-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-900 file:text-white dark:file:bg-white dark:file:text-neutral-900 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3"
                    />
                    {sceneFile && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Selected file: {sceneFile.name} ·{" "}
                        {(sceneFile.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSceneTitle("");
                      setSceneFile(null);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadScene}
                    className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity shadow-sm"
                  >
                    Upload Scene
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center text-center">
                <FileVideo className="w-12 h-12 text-neutral-400 mb-6 animate-pulse" />
                <p className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                  Uploading your video...
                </p>
                <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden mt-4">
                  <div
                    className="bg-neutral-900 dark:bg-white h-full rounded-full transition-all duration-200 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium text-neutral-500 text-right w-full">
                  {uploadProgress}%
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <header className="relative z-50 w-full bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="bg-neutral-900 dark:bg-white p-1.5 rounded-lg shadow-sm">
              <Layout className="w-5 h-5 text-white dark:text-neutral-900" />
            </div>
            <span className="text-xl font-bold tracking-tight">FrameLink</span>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900/50 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-white dark:bg-[#222] text-neutral-900 dark:text-white font-medium shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                }`
              }
            >
              <Layout className="w-4 h-4" /> Workspace
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-white dark:bg-[#222] text-neutral-900 dark:text-white font-medium shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                }`
              }
            >
              <Folder className="w-4 h-4" /> Projects
            </NavLink>
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden md:block">
              <SearchBar
                searchLabel="Search..."
                setIsCmdOpen={() => setIsCmdOpen(true)}
              />
            </div>

            <ThemeToggle />

            <button
              onClick={toggleNotif}
              className="relative text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 border-2 border-white dark:border-[#111] bg-blue-500 rounded-full"></span>
            </button>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div
              className="hidden md:flex items-center gap-3 pl-4 border-l border-neutral-200 dark:border-neutral-800 cursor-pointer group"
              onClick={() => navigate("/profile")}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center font-bold text-xs text-neutral-800 dark:text-neutral-200 shadow-inner ring-2 ring-transparent group-hover:ring-neutral-300 dark:group-hover:ring-neutral-700 transition-all">
                JD
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLogoutModalOpen(true);
                }}
                className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {isSidebarOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-[#111] border-b border-neutral-200 dark:border-neutral-800 shadow-xl px-4 py-4 flex flex-col gap-2">
            <div className="mb-2">
              <SearchBar
                searchLabel="Search..."
                setIsCmdOpen={() => {
                  setIsSidebarOpen(false);
                  setIsCmdOpen(true);
                }}
              />
            </div>

            <NavLink
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium"
                    : "text-neutral-600 dark:text-neutral-400"
                }`
              }
            >
              <Layout className="w-5 h-5" /> Workspace
            </NavLink>
            <NavLink
              to="/projects"
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium"
                    : "text-neutral-600 dark:text-neutral-400"
                }`
              }
            >
              <Folder className="w-5 h-5" /> Projects
            </NavLink>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-2"></div>
            <button
              onClick={() => {
                setIsSidebarOpen(false);
                setIsLogoutModalOpen(true);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        )}
      </header>

      {isCmdOpen && <SearchModal setIsCmdOpen={setIsCmdOpen} />}

      <main className="flex-1 overflow-hidden relative z-10 w-full">
        <Outlet
          context={{
            setIsSidebarOpen,
            activeProject,
            setActiveProject,
            toggleNotif,
            setIsModalOpen,
            navigate,
            tasks: localTasks,
            setTasks,
            handleMoveTask,
            columns,
            onOpenVideo,
            projects,
            mousePos,
            setActiveTab,
            activeTab,
            isCmdOpen,
            setIsCmdOpen,
            handleCreateProject
          }}
        />
      </main>
    </div>
  );
};

export default Dashboard;
