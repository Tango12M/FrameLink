import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./index.css";

// Providers
import { ThemeProvider } from "./app/theme.context.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
