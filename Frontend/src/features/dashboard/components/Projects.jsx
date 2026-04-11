import { useOutletContext } from "react-router-dom";
import { Folder, Plus } from "lucide-react";
import { toast } from "react-toastify";

const Projects = () => {
  const { projects } = useOutletContext();

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Title & Action Bar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-white">
            All Projects
          </h2>
          <button
            onClick={() => toast.info("New directory created!")}
            className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> New Directory
          </button>
        </div>

        {projects.length === 0 ? (
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
              onClick={() => toast.info("New directory created!")}
              className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium px-6 py-3 rounded-full flex items-center gap-2 shadow-sm hover:opacity-90"
            >
              <Plus className="w-5 h-5" /> Create First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project cards mapping removed for empty state */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;