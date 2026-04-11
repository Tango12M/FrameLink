import { ToastContainer, Slide } from "react-toastify";
import { useContext, useEffect, useState } from "react";

// Providers
import { AuthProvider } from "../features/auth/auth.context";
import { ThemeContext, ThemeProvider } from "./theme.context";
import { RouterProvider } from "react-router-dom";

// Components
import Notifications from "../features/shared/components/Notifications";
import AppGate from "./components/AppGate";

// Routes
import { createRouter } from "./app.routes";
import SearchModal from "../features/shared/components/SearchModal";
import { DashboardProvider } from "../features/dashboard/dashboard.context";

const App = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  const toggleNotif = () => setIsNotifOpen(!isNotifOpen);

  const router = createRouter(toggleNotif, setIsCmdOpen);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsCmdOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AuthProvider>
      <DashboardProvider>
        <AppGate>
          <RouterProvider router={router} />
        </AppGate>
        {isCmdOpen && <SearchModal setIsCmdOpen={setIsCmdOpen} />}
        <Notifications isOpen={isNotifOpen} setIsOpen={setIsNotifOpen} />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          limit={3}
          hideProgressBar
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme === "dark" ? "light" : "dark"}
          transition={Slide}
        />
      </DashboardProvider>
    </AuthProvider>
  );
};

export default App;
