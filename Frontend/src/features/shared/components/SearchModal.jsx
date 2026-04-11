import { useContext } from "react";
import { ThemeContext } from "../../../app/theme.context";
import { Folder, Moon, Search, Settings, Sun } from "lucide-react";

const SearchModal = ({ setIsCmdOpen, setCurrentPage }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className="fixed inset-0 z-200 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
      onClick={() => setIsCmdOpen(false)}
    >
      <div
        className="bg-white dark:bg-[#111] w-full max-w-2xl rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-5 h-5 text-neutral-500 mr-4" />
          <input
            autoFocus
            placeholder="Search projects or type a command..."
            className="flex-1 bg-transparent border-none focus:outline-none text-xl text-neutral-900 dark:text-white placeholder:text-neutral-500"
          />
          <div className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md text-xs text-neutral-500 font-medium">
            ESC
          </div>
        </div>
        <div className="p-3">
          <div className="px-4 py-3 text-xs font-bold text-neutral-400 uppercase tracking-widest">
            Quick Actions
          </div>
          <button
            onClick={() => {
              setIsCmdOpen(false);
              setCurrentPage("projects");
            }}
            className="w-full text-left px-5 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 rounded-2xl text-neutral-900 dark:text-white flex items-center gap-4 transition-colors font-medium"
          >
            <Folder className="w-5 h-5 text-neutral-500" /> Go to Projects
          </button>
          <button
            onClick={() => {
              setIsCmdOpen(false);
              setCurrentPage("settings");
            }}
            className="w-full text-left px-5 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 rounded-2xl text-neutral-900 dark:text-white flex items-center gap-4 transition-colors font-medium"
          >
            <Settings className="w-5 h-5 text-neutral-500" /> Workspace Settings
          </button>
          <button
            onClick={() => {
              setIsCmdOpen(false);
              toggleTheme();
            }}
            className="w-full text-left px-5 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 rounded-2xl text-neutral-900 dark:text-white flex items-center gap-4 transition-colors font-medium"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-neutral-500" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-500" />
            )}{" "}
            Toggle {isDark ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
