import MagneticButton from "../../shared/components/MagnetButton";
import { AlertTriangle, MonitorPlay } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import Header from "../../shared/components/Header";
import { toast } from "react-toastify";

const WorkspaceSettings = ({ setIsCmdOpen }) => {
  const context = useOutletContext();
  const { setActiveTab, mousePos, setIsSidebarOpen, toggleNotif } = context;
  const activeTab = context?.activeTab || "preferences";

  return (
    <>
      <Header
        header={{
          name: "Workspace Settings",
          searchLabel: "Search settings...",
        }}
        setIsCmdOpen={() => setIsCmdOpen(true)}
        setIsSidebarOpen={setIsSidebarOpen}
        toggleNotif={toggleNotif}
      />

      <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <h2 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-white mb-6">
              Manage Workspace
            </h2>
            <div className="flex border-b border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setActiveTab("preferences")}
                className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "preferences" ? "border-neutral-900 dark:border-white text-neutral-900 dark:text-white" : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"}`}
              >
                Preferences
              </button>
              <button
                onClick={() => setActiveTab("integrations")}
                className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "integrations" ? "border-neutral-900 dark:border-white text-neutral-900 dark:text-white" : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"}`}
              >
                Integrations
              </button>
              <button
                onClick={() => setActiveTab("advanced")}
                className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "advanced" ? "border-neutral-900 dark:border-white text-neutral-900 dark:text-white" : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"}`}
              >
                Advanced
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm relative overflow-hidden">
            <div
              className="pointer-events-none absolute -inset-px opacity-0 hover:opacity-100 transition duration-500 z-0"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x % 800}px ${mousePos.y % 800}px, rgba(255,255,255,0.02), transparent)`,
              }}
            />

            <div className="relative z-10 animate-[fadeIn_0.3s_ease-out]">
              {activeTab === "preferences" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
                        Workspace Name{" "}
                      </label>
                      <input
                        type="text"
                        defaultValue="FrameLink Agency"
                        className="w-full max-w-md bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 px-4 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
                        Default Export Resolution{" "}
                      </label>
                      <select className="w-full max-w-md bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 px-4 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all appearance-none text-neutral-900 dark:text-white">
                        <option>4K (3840 x 2160)</option>
                        <option>1080p (1920 x 1080)</option>
                        <option>Vertical / Shorts (1080 x 1920)</option>
                      </select>
                    </div>
                  </div>

                  <MagneticButton
                    onClick={() =>
                      toast.info("Preferences saved successfully!")
                    }
                  >
                    <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium px-8 py-3 rounded-xl shadow-lg">
                      Save Preferences
                    </div>
                  </MagneticButton>
                </div>
              )}

              {activeTab === "integrations" && (
                <div className="space-y-6">
                  <p className="text-neutral-500 font-light text-sm mb-6">
                    Connect external tools to automate your publishing workflow.
                  </p>
                  <div className="flex items-center justify-between p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50 dark:bg-neutral-900/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl flex items-center justify-center">
                        <MonitorPlay className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-neutral-900 dark:text-white font-medium">
                          YouTube
                        </h4>
                        <p className="text-sm text-neutral-500 font-light">
                          Publish directly to your channel.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        toast.info("YouTube connected successfully!")
                      }
                      className="text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-lg hover:opacity-90"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "advanced" && (
                <div className="space-y-8">
                  <div className="pt-8 border-t border-red-200/50 dark:border-red-900/30">
                    <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-500">
                      <AlertTriangle className="w-5 h-5" />
                      <h4 className="font-medium">Danger Zone</h4>
                    </div>
                    <p className="text-sm text-neutral-500 font-light mb-6 max-w-md">
                      Deleting your workspace is irreversible. All projects,
                      videos, and team configurations will be permanently
                      deleted.
                    </p>
                    <button className="text-sm font-medium bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-500/30 px-6 py-2.5 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                      Delete Workspace
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspaceSettings;
