import { useContext } from "react";
import { ThemeContext } from "../../../app/theme.context";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
