import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Folder, Plus, X, LayoutTemplate, MoreHorizontal, Clock } from "lucide-react";
import { toast } from "react-toastify";

const Projects = () => {
  const {
    projects,
    navigate,
    setActiveProject,
    handleCreateProject,
  } = useOutletContext();

  const [localProjects, setLocalProjects] = useState(projects || []);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    setLocalProjects(projects || []);
  }, [projects]);

  const handleCreateProjectLocal = async () => {
    if (!projectName.trim()) {
      toast.error("Please enter a project name.");
      return;
    }

    const payload = {
      title: projectName,
      description: projectDescription || "No description provided.",
    };

    const response = await handleCreateProject?.(payload);
    if (!response?.success) {
      return;
    }

    const created = response.project || response;
    setProjectName("");
    setProjectDescription("");
    setIsCreateModalOpen(false);

    if (setActiveProject && created) {
      setActiveProject({ ...created, id: created._id });
    }
    navigate("/");
  };

  // --- NEW: Handle opening a project ---
  const handleOpenProject = (project) => {
    if (setActiveProject) {
      setActiveProject(project); // Set the global active project
    }
    navigate("/"); // Send them to the Workspace (Kanban board)
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col relative">
      
      {/* --- CREATE PROJECT MODAL --- */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCreateModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-6 md:p-8 w-full max-w-md shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border border-neutral-200 dark:border-neutral-800">
                  <LayoutTemplate className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <h3 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-white">
                  New Project
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Project Name
                </label>
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. Q3 Marketing Campaign"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-shadow placeholder:text-neutral-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Description <span className="text-neutral-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  placeholder="What is this project for?"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-shadow placeholder:text-neutral-400 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProjectLocal}
                className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity shadow-sm"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PAGE CONTENT --- */}
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-white">
            All Projects
          </h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> New Directory
          </button>
        </div>

        {localProjects.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center animate-[fadeIn_0.5s_ease-out]">
            <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl flex items-center justify-center mb-6">
              <Folder className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-white mb-2">
              No projects yet
            </h3>
            <p className="text-neutral-500 font-light mb-6 max-w-sm">
              Create a new directory to start organizing your videos and
              collaborating with your team.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium px-6 py-3 rounded-full flex items-center gap-2 shadow-sm hover:opacity-90"
            >
              <Plus className="w-5 h-5" /> Create First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => handleOpenProject(project)} // Trigger project open
                className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors group cursor-pointer animate-[fadeIn_0.3s_ease-out] shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-200 dark:border-neutral-800 group-hover:scale-105 transition-transform">
                    <Folder className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors p-1"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-xl font-medium text-neutral-900 dark:text-white mb-1 truncate">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-2 mb-6 min-h-[2.5rem]">
                  {project.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800/50">
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-md">
                    {project.status || "raw"}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Clock className="w-3.5 h-3.5" /> {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : "New"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;