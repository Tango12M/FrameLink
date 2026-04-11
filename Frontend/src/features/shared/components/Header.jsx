import { Bell, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";

const Header = ({ activeProject, header, setIsSidebarOpen, toggleNotif, setIsCmdOpen }) => {
  return (
    <header className="h-20 flex shrink-0 items-center justify-between px-6 md:px-10 border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md z-30 transition-colors duration-700">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-2 text-xl font-medium">
          {header.name}
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        {/* CMD+K SEARCH BAR */}
        {(header.name === "Project Hub" ||
          header.name === "Workspace" ||
          header.name === "Workspace Settings") && (
          <SearchBar searchLabel={header.searchLabel} setIsCmdOpen={setIsCmdOpen} />
        )}

        {/* THEME TOGGLE */}
        <ThemeToggle />

        {/* UPDATED BELL ICON */}
        <button
          onClick={toggleNotif}
          className="relative text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 border-2 border-white dark:border-[#0a0a0a] bg-blue-500 rounded-full"></span>
        </button>

        {/* Header Special Button */}
        {(header.name === "Project Hub" ||
          header.name === "Team Management" ||
          (header.name === "Workspace" && activeProject)) && (
          <button
            onClick={header.onClick}
            className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow-sm cursor-pointer hover:opacity-90"
          >
            {header.label} {header.labelName}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
