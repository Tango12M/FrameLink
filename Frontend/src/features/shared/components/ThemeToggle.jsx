import { useState, useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../../../app/theme.context";
import { Moon, Sun, Flame, ChevronDown } from "lucide-react";

const ThemeToggle = () => {
  // We now pull in setTheme from your context
  const { theme, setTheme } = useContext(ThemeContext) || {};
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown if the user clicks anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedTheme) => {
    // Explicitly set the exact theme they clicked on
    if (theme !== selectedTheme && setTheme) {
      setTheme(selectedTheme);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        {theme === "dark" && <Moon className="w-4 h-4" />}
        {theme === "light" && <Sun className="w-4 h-4" />}
        {theme === "velvet" && <Flame className="w-4 h-4 text-rose-600" />}
        
        <span className="hidden md:block">Theme</span>
        <ChevronDown 
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl overflow-hidden animate-[fadeIn_0.1s_ease-out] z-50">
          <button
            onClick={() => handleSelect("light")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
              theme === "light"
                ? "text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:text-white font-medium"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
            }`}
          >
            <Sun className="w-4 h-4" /> Light
          </button>
          
          <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800/50"></div>
          
          <button
            onClick={() => handleSelect("dark")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
              theme === "dark"
                ? "text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:text-white font-medium"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
            }`}
          >
            <Moon className="w-4 h-4" /> Dark
          </button>

          <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800/50"></div>
          
          {/* NEW VELVET OPTION */}
          <button
            onClick={() => handleSelect("velvet")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
              theme === "velvet"
                ? "text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:text-white font-medium"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
            }`}
          >
            <Flame className="w-4 h-4" /> Velvet
          </button>

        </div>
      )}
    </div>
  );
};

export default ThemeToggle;