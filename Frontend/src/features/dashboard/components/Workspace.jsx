import {
  CheckCircle,
  Clock,
  Film,
  Flag,
  Folder,
  GripHorizontal,
  LayoutDashboard,
  MessageCircle,
  MessageSquare,
  Plus,
  Scissors,
  Video,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import Header from "../../shared/components/Header";

const Workspace = ({ setIsCmdOpen }) => {
  const {
    setIsSidebarOpen,
    toggleNotif,
    setIsModalOpen,
    activeProject,
    navigate,
    tasks,
    columns,
    // handleDrop,
    // handleDragStart,
    onOpenVideo,
  } = useOutletContext();

  return (
    <>
      <Header
        header={{
          name: "Workspace",
          label: <Plus className="w-4 h-4" />,
          labelName: "Upload",
          searchLabel: "Search videos...",
          onClick: () => setIsModalOpen(true),
        }}
        setIsCmdOpen={() => setIsCmdOpen(true)}
        setIsSidebarOpen={setIsSidebarOpen}
        toggleNotif={toggleNotif}
      />

      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10">
        {!activeProject ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center animate-[fadeIn_0.5s_ease-out]">
            <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl flex items-center justify-center mb-6 mx-auto">
              <LayoutDashboard className="w-10 h-10 text-neutral-400" />
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-white mb-3">
              No workspace yet
            </h2>
            <p className="text-neutral-500 max-w-sm font-light mb-8 mx-auto">
              Click on a project to start working, or create a new directory to
              begin.
            </p>
            <button
              onClick={() => navigate("/projects")}
              className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
            >
              <Folder className="w-5 h-5" /> Browse Projects
            </button>
          </div>
        ) : (
          <div className="animate-[fadeIn_0.3s_ease-out] space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-neutral-100 dark:bg-neutral-900 p-2 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <Video className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  </div>
                </div>
                <h3 className="text-4xl font-medium tracking-tight mb-1 text-neutral-900 dark:text-white">
                  {tasks.length}
                </h3>
                <p className="text-sm text-neutral-500 font-medium">
                  Total Active Videos
                </p>
              </div>
              <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-neutral-100 dark:bg-neutral-900 p-2 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <Clock className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  </div>
                </div>
                <h3 className="text-4xl font-medium tracking-tight mb-1 text-neutral-900 dark:text-white">
                  {tasks.filter((t) => t.status === "In Review").length}
                </h3>
                <p className="text-sm text-neutral-500 font-medium">
                  Pending Review
                </p>
              </div>
              <div className="bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-3xl p-6 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-neutral-300 dark:bg-neutral-800 p-2 rounded-xl border border-neutral-400 dark:border-neutral-700">
                    <CheckCircle className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
                  </div>
                </div>
                <h3 className="text-4xl font-medium tracking-tight mb-1 text-neutral-900 dark:text-white">
                  0
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-400 font-medium">
                  Published in Project
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-white">
                  Active Pipeline
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-125 pb-6">
                {columns.map((column) => {
                  const columnTasks = tasks.filter((t) => t.status === column);

                  return (
                    <div
                      key={column}
                      // onDragOver={(e) => e.preventDefault()}
                      // onDrop={(e) => handleDrop(e, column)}
                      className="flex-1 bg-neutral-200/50 dark:bg-[#111]/50 border border-neutral-300 dark:border-neutral-800/80 rounded-4xl p-4 flex flex-col gap-4"
                    >
                      <div className="flex items-center justify-between px-2">
                        <h3 className="font-medium text-neutral-900 dark:text-white">
                          {column}
                        </h3>
                        <span className="text-xs font-medium bg-neutral-300 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2.5 py-1 rounded-full">
                          {columnTasks.length}
                        </span>
                      </div>
                      <div className="flex flex-col gap-4 flex-1">
                        {columnTasks.length === 0 && (
                          <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600 opacity-50 py-10 text-center">
                            {column === "Raw Footage" && (
                              <Film className="w-10 h-10 mb-3" />
                            )}
                            {column === "Editing" && (
                              <Scissors className="w-10 h-10 mb-3" />
                            )}
                            {column === "In Review" && (
                              <MessageCircle className="w-10 h-10 mb-3" />
                            )}
                            {column === "Ready" && (
                              <Flag className="w-10 h-10 mb-3" />
                            )}
                            <p className="text-sm font-medium">No Items Yet</p>
                          </div>
                        )}
                        {columnTasks.map((task) => (
                          <div
                            key={task.id}
                            // draggable
                            // onDragStart={(e) => handleDragStart(e, task.id)}
                            onClick={() => onOpenVideo(task)}
                            className="bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 cursor-grab active:cursor-grabbing hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors shadow-sm group relative overflow-hidden"
                          >
                            <div
                              className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500"
                              style={{
                                background: `radial-gradient(200px circle at center, rgba(255,255,255,0.03), transparent)`,
                              }}
                            />
                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-3">
                                <div className="px-2 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md text-[10px] font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                                  {task.tag}
                                </div>
                                <GripHorizontal className="w-4 h-4 text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 transition-colors" />
                              </div>
                              <h4 className="text-neutral-900 dark:text-white font-medium mb-4 leading-tight">
                                {task.title}
                              </h4>
                              <div className="flex items-center justify-between mt-auto">
                                <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-700 dark:text-neutral-300">
                                  JD
                                </div>
                                {task.comments > 0 && (
                                  <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    {task.comments}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Workspace;
