import { useState } from "react";
import { Users, Plus, ArrowRight, Layout, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const TeamSetup = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // State for Modals
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // State for the invite input
  const [inviteCode, setInviteCode] = useState("");

  const handleGlobalMouseMove = (e) =>
    setMousePos({ x: e.clientX, y: e.clientY });

  const handleConfirmLogout = async () => {
    setIsLogoutModalOpen(false);
    const result = await handleLogout();
    if (result?.success) {
      navigate("/landing");
    }
  };

  const handleJoinTeam = () => {
    if (inviteCode.trim() === "") {
      toast.error("Please enter a valid invite code or link.");
      return;
    }

    // Simulate successful join
    setIsJoinModalOpen(false);
    toast.success("Successfully joined the workspace!");
    navigate("/projects");
  };

  return (
    <div
      onMouseMove={handleGlobalMouseMove}
      className="min-h-screen bg-neutral-50 dark:bg-[#050505] text-neutral-900 dark:text-neutral-50 font-sans flex flex-col relative overflow-hidden transition-colors duration-700"
    >
      {/* Dynamic Background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300 opacity-0 dark:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.035), transparent 80%)`,
        }}
      />

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsLogoutModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-[fadeIn_0.2s_ease-out] flex flex-col items-center text-center z-10">
            <div className="w-14 h-14 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-5 text-red-500 border border-red-100 dark:border-red-900/50 shadow-inner">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">
              Ready to leave?
            </h3>
            <p className="text-neutral-500 text-sm font-light mb-8">
              Are you sure you want to log out of FrameLink?
            </p>
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-md"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- JOIN TEAM MODAL --- */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsJoinModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-8 w-full max-w-md shadow-2xl animate-[fadeIn_0.2s_ease-out] flex flex-col z-10">
            <div className="flex items-center justify-center w-14 h-14 bg-neutral-100 dark:bg-neutral-900 rounded-full mb-6 mx-auto border border-neutral-200 dark:border-neutral-800 shadow-inner">
              <Users className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2 text-center">
              Join a Workspace
            </h3>
            <p className="text-neutral-500 text-sm font-light mb-8 text-center leading-relaxed">
              Paste the invite link or code provided by your team administrator
              to gain access.
            </p>

            <div className="relative group mb-8">
              <input
                type="text"
                autoFocus
                placeholder="e.g. framelink.app/invite/..."
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-white transition-all shadow-inner placeholder:text-neutral-400 font-medium"
                onKeyDown={(e) => e.key === "Enter" && handleJoinTeam()}
              />
            </div>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setIsJoinModalOpen(false)}
                className="flex-1 py-3.5 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinTeam}
                className="flex-1 py-3.5 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold hover:opacity-90 transition-opacity shadow-md"
              >
                Join Team
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- UNIFIED PREMIUM HEADER --- */}
      <header className="sticky top-0 z-[100] w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-900 dark:bg-white p-1.5 rounded-lg shadow-sm">
            <Layout className="w-5 h-5 text-white dark:text-neutral-900" />
          </div>
          <span className="text-xl font-bold tracking-tighter">FrameLink</span>
        </div>

        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="text-sm font-medium text-neutral-500 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center gap-2 group"
        >
          Sign Out{" "}
          <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </header>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="animate-[fadeIn_0.5s_ease-out] flex flex-col items-center w-full max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center text-neutral-900 dark:text-white">
            Set up your workspace
          </h1>
          <p className="text-neutral-500 text-lg font-light mb-14 text-center max-w-md leading-relaxed">
            To get started, create a new workspace for your projects or join an
            existing team pipeline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Create Team Card */}
            <div
              onClick={() => navigate("/team")}
              className="group cursor-pointer bg-white/60 dark:bg-[#111]/60 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800/60 rounded-[2.5rem] p-8 md:p-10 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
              </div>
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-neutral-200 dark:border-neutral-800 transition-transform duration-300 group-hover:scale-110">
                <Plus className="w-8 h-8 text-neutral-800 dark:text-neutral-200" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
                Create a new team
              </h3>
              <p className="text-neutral-500 font-light leading-relaxed">
                Start from scratch. Set up a fresh workspace, invite your
                editors, and start shipping better videos.
              </p>
            </div>

            {/* Join Team Card */}
            <div
              onClick={() => setIsJoinModalOpen(true)}
              className="group cursor-pointer bg-white/60 dark:bg-[#111]/60 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800/60 rounded-[2.5rem] p-8 md:p-10 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
              </div>
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-neutral-200 dark:border-neutral-800 transition-transform duration-300 group-hover:scale-110">
                <Users className="w-8 h-8 text-neutral-800 dark:text-neutral-200" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
                Join existing team
              </h3>
              <p className="text-neutral-500 font-light leading-relaxed">
                Got an invite? Enter your team's workspace and jump straight
                into the active editing pipeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSetup;
