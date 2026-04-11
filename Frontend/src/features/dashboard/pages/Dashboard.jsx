import { useState } from "react";
import {
  Layout,
  Folder,
  Users,
  Settings,
  LogOut,
  X,
  UploadCloud,
  FileVideo,
} from "lucide-react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useDashboard } from "../hooks/useDashboard";

// ADDED toggleNotif to props
const Dashboard = ({ onOpenVideo, activeProject, toggleNotif }) => {
  const navigate = useNavigate();

  const {
    handleCreateTask,
    handleFetchTasks,
    handleCreateProject,
    handleFetchProjects,
    loading,
    projects,
    tasks,
  } = useDashboard();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(null);
  const columns = ["Raw Footage", "Editing", "In Review", "Ready"];

  /* Assuming we are not using the drag functionality */
  // const handleDragStart = (e, id) => e.dataTransfer.setData("taskId", id);

  // const handleDrop = (e, newStatus) => {
  //   const id = e.dataTransfer.getData("taskId");
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === parseInt(id) ? { ...task, status: newStatus } : task,
  //     ),
  //   );
  //   toast.info(`Video moved to ${newStatus}`);
  // };
  /* Assuming we are not using the drag functionality */

  const handleGlobalMouseMove = (e) =>
    setMousePos({ x: e.clientX, y: e.clientY });

  const simulateUpload = () => {
    setUploadProgress(1);
    let progress = 1;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(async () => {
          const newTask = {
            id: Date.now(),
            title: "New Raw Sequence_" + Math.floor(Math.random() * 1000),
            status: "Raw Footage",
            tag: "New",
            comments: 0,
          }; 
          await handleCreateTask(newTask) // Creates task
          setIsModalOpen(false);
          setUploadProgress(0);
          toast.info("Footage uploaded successfully!");
        }, 600);
      }
      setUploadProgress(progress);
    }, 200);
  };

  return (
    <div
      onMouseMove={handleGlobalMouseMove}
      className="min-h-screen bg-neutral-100 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-50 font-sans selection:bg-neutral-500/30 overflow-hidden flex relative transition-colors duration-700"
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300 opacity-0 dark:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.03), transparent 80%)`,
        }}
      />

      {/* --- UPLOAD MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !uploadProgress && setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-4xl p-8 w-full max-w-lg shadow-2xl animate-[fadeIn_0.3s_ease-out]">
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
              <div
                onClick={simulateUpload}
                className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
              >
                <div className="w-16 h-16 bg-white dark:bg-[#111] shadow-sm border border-neutral-200 dark:border-neutral-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-neutral-500 dark:text-neutral-400" />
                </div>
                <p className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                  Click or drag raw footage here
                </p>
                <p className="text-sm text-neutral-500 font-light">
                  Supports MP4, MOV, RAW up to 50GB.
                </p>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center text-center">
                <FileVideo className="w-12 h-12 text-neutral-400 mb-6 animate-pulse" />
                <p className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                  Ingesting footage...
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

      {/* --- SIDEBAR --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed md:relative z-50 w-64 h-screen bg-white dark:bg-[#111] border-r border-neutral-200 dark:border-neutral-800 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="h-20 flex items-center px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-neutral-900 dark:bg-white p-2 rounded-lg">
              <Layout className="w-5 h-5 text-white dark:text-neutral-900" />
            </div>
            <span className="text-xl font-bold tracking-tight">FrameLink</span>
          </div>
        </div>
        <div className="flex-1 px-4 py-6 space-y-2">
          <p className="px-2 text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">
            Menu
          </p>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive
                  ? "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-900 dark:text-white font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
              }`
            }
          >
            <Layout className="w-5 h-5" /> Workspace
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive
                  ? "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-900 dark:text-white font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
              }`
            }
          >
            <Folder className="w-5 h-5" /> Projects
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive
                  ? "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-900 dark:text-white font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
              }`
            }
          >
            <Users className="w-5 h-5" /> Team
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive
                  ? "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-900 dark:text-white font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
              }`
            }
          >
            <Settings className="w-5 h-5" /> Settings
          </NavLink>
        </div>
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <div
            className="flex items-center justify-between px-2 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/50 p-2 rounded-xl transition-colors cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-medium text-sm text-neutral-900 dark:text-white">
                JD
              </div>
              <div className="text-sm font-medium text-neutral-900 dark:text-white">
                Jane Doe
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/landing");
              }}
              className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen relative z-10 overflow-hidden">
        <Outlet
          context={{
            setIsSidebarOpen,
            activeProject,
            toggleNotif,
            setIsModalOpen,
            navigate,
            tasks,
            columns,
            // handleDrop,
            // handleDragStart,
            onOpenVideo,
            projects,
            mousePos,
            setActiveTab,
            activeTab,
          }}
        />
      </main>
    </div>
  );
};

export default Dashboard;
