import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("framelink-theme") || "dark"
  );

  useEffect(() => {
    const root = document.documentElement;

    // First, remove all custom theme classes
    root.classList.remove("dark", "velvet");

    // Then, add the active theme (unless it's light, which is default)
    if (theme !== "light") {
      root.classList.add(theme);
    }

    localStorage.setItem("framelink-theme", theme);
  }, [theme]);

  // We keep this here just in case any other part of your app still uses it
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    // We added setTheme to the values being provided
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}