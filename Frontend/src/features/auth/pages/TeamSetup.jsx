import { useState } from "react";
import { Users, Plus, ArrowRight, Layout } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeamSetup = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleGlobalMouseMove = (e) =>
    setMousePos({ x: e.clientX, y: e.clientY });

  return (
    <div
      onMouseMove={handleGlobalMouseMove}
      className="min-h-screen bg-neutral-100 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-50 font-sans flex flex-col relative overflow-hidden transition-colors duration-700"
    >
      {/* Dynamic Background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300 opacity-0 dark:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.035), transparent 80%)`,
        }}
      />

      {/* Simple Top Navigation */}
      <nav className="w-full relative z-10 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-900 dark:bg-white p-2 rounded-lg shadow-sm">
            <Layout className="w-5 h-5 text-white dark:text-neutral-900" />
          </div>
          <span className="text-xl font-bold tracking-tight">FrameLink</span>
        </div>
        <button
          onClick={() => navigate("/landing")}
          className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="animate-[fadeIn_0.5s_ease-out] flex flex-col items-center w-full max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-center text-neutral-900 dark:text-white">
            Set up your workspace
          </h1>
          <p className="text-neutral-500 text-lg font-light mb-12 text-center max-w-md">
            To get started, create a new workspace for your projects or join an
            existing team.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Create Team Card */}
            <div
              onClick={() => navigate("/")}
              className="group cursor-pointer bg-white/70 dark:bg-[#111]/70 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800/60 rounded-[2rem] p-8 md:p-10 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl flex items-center justify-center mb-8 shadow-inner ring-4 ring-white dark:ring-[#111] transition-transform duration-300 group-hover:scale-110">
                <Plus className="w-8 h-8 text-neutral-800 dark:text-neutral-200" />
              </div>
              <h3 className="text-2xl font-medium text-neutral-900 dark:text-white mb-3">
                Create a new team
              </h3>
              <p className="text-neutral-500 font-light leading-relaxed">
                Start from scratch. Set up a fresh workspace, invite your
                editors, and start shipping better videos.
              </p>
            </div>

            {/* Join Team Card */}
            <div
              onClick={() => navigate("/")}
              className="group cursor-pointer bg-white/70 dark:bg-[#111]/70 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800/60 rounded-[2rem] p-8 md:p-10 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl flex items-center justify-center mb-8 shadow-inner ring-4 ring-white dark:ring-[#111] transition-transform duration-300 group-hover:scale-110">
                <Users className="w-8 h-8 text-neutral-800 dark:text-neutral-200" />
              </div>
              <h3 className="text-2xl font-medium text-neutral-900 dark:text-white mb-3">
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