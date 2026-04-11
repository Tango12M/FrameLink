import { createBrowserRouter } from "react-router-dom";

// Pages
import Dashboard from "../features/dashboard/pages/Dashboard";
import Auth from "../features/auth/pages/Auth";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import TeamSetup from "../features/auth/pages/TeamSetup"; // <-- New page import

// Components (No changes here)
import WorkspaceSettings from "../features/dashboard/components/WorkspaceSettings";
import Workspace from "../features/dashboard/components/Workspace";
import Projects from "../features/dashboard/components/Projects";
import Profile from "../features/dashboard/components/Profile";
import Protected from "../features/auth/components/Protected";
import Teams from "../features/dashboard/components/Teams";
import Guest from "../features/auth/components/Guest";

export const createRouter = (toggleNotif, setIsCmdOpen) =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Dashboard toggleNotif={toggleNotif} />
        </Protected>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Workspace setIsCmdOpen={setIsCmdOpen} />,
        },
        {
          path: "projects",
          element: <Projects setIsCmdOpen={setIsCmdOpen} />,
        },
        {
          path: "team",
          element: <Teams />,
        },
        {
          path: "settings",
          element: <WorkspaceSettings setIsCmdOpen={setIsCmdOpen} />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/landing",
      element: <LandingPage />,
    },
    {
      path: "/auth",
      element: (
        <Guest>
          <Auth />
        </Guest>
      ),
    },
    // New route added right here
    {
      path: "/setup",
      element: <TeamSetup />,
    },
  ]);
