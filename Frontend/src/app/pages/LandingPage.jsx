import { useState, useEffect, useContext } from "react";
import {
  Layout,
  MessageSquare,
  Sparkles,
  PlayCircle,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon,
  Video,
  Wand2,
  Rocket,
  PlaySquare,
  Tv,
  Clapperboard,
  Film,
  MonitorPlay,
  Smartphone,
  Database,
  Eye,
} from "lucide-react";
import MagneticButton from "../../features/shared/components/MagnetButton";
import { ThemeContext } from "../theme.context";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const words = ["stupidly fast.", "with AI magic.", "in perfect sync."];
  const [wordIndex, setWordIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleGlobalMouseMove = (e) =>
    setMousePos({ x: e.clientX, y: e.clientY });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "50px" },
    );
    const timer = setTimeout(
      () =>
        document
          .querySelectorAll(".reveal")
          .forEach((el) => observer.observe(el)),
      100,
    );
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setIsFading(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div
      onMouseMove={handleGlobalMouseMove}
      className="min-h-screen bg-neutral-100 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-50 font-sans selection:bg-neutral-500/30 transition-colors duration-700 overflow-x-hidden"
    >
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300 opacity-0 dark:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.035), transparent 80%)`,
        }}
      />

      <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex flex-col items-center px-4 md:px-6 reveal">
        <nav className="w-full max-w-5xl rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-sm px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-neutral-900 dark:bg-white p-2 rounded-full">
              <Layout className="w-4 h-4 md:w-5 md:h-5 text-white dark:text-neutral-900" />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight">
              FrameLink
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <a
              href="#features"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Process
            </a>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all duration-300"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <div className="hidden md:block">
              <MagneticButton onClick={() => navigate("/auth")}>
                <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold px-6 py-2.5 rounded-full shadow-md">
                  Login
                </div>
              </MagneticButton>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-neutral-600 dark:text-neutral-400 p-1"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
        <div
          className={`w-full max-w-5xl overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "max-h-100 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}
        >
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-3xl p-6 flex flex-col gap-5">
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-neutral-600 dark:text-zinc-300 font-medium text-lg hover:text-neutral-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-neutral-600 dark:text-zinc-300 font-medium text-lg hover:text-neutral-900 transition-colors"
            >
              Process
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/auth");
              }}
              className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-lg font-semibold px-6 py-3 rounded-full"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <header className="relative max-w-5xl mx-auto px-6 pt-40 md:pt-48 pb-10 flex flex-col items-center text-center">
        <h1 className="reveal reveal-delay-1 text-5xl sm:text-6xl md:text-8xl font-medium tracking-tighter mb-6 md:mb-8 text-neutral-900 dark:text-white transition-colors duration-500 h-auto">
          Ship better videos, <br className="hidden md:block" />
          <span
            className={`inline-block text-neutral-500 dark:text-neutral-400 transition-opacity duration-500 pb-2 ${isFading ? "opacity-0" : "opacity-100"}`}
          >
            {words[wordIndex]}
          </span>
        </h1>
        <p className="reveal reveal-delay-2 max-w-2xl text-base md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 md:mb-12 font-light leading-relaxed">
          The ultimate Kanban workspace for modern creators. Track edits, review
          footage, and let our AI generate your metadata automatically.
        </p>
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center gap-4 w-full justify-center relative z-10 mb-16">
          <MagneticButton
            className="w-full sm:w-auto"
            onClick={() => navigate("/auth")}
          >
            <div className="w-full sm:w-auto bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-lg font-medium px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg">
              Start Building Free <ArrowRight className="w-5 h-5" />
            </div>
          </MagneticButton>
          <button className="w-full sm:w-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-lg font-medium px-8 py-4 rounded-full flex items-center justify-center gap-2">
            <PlayCircle className="w-5 h-5 text-neutral-500" /> Watch Demo
          </button>
        </div>

        <div className="reveal reveal-delay-3 w-full max-w-6xl mt-10 mb-10 p-2 bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl relative group overflow-hidden">
          <div className="w-full h-[75 md:h-125 bg-neutral-200 dark:bg-neutral-950 rounded-2xl flex items-center justify-center border border-neutral-300 dark:border-neutral-800 relative z-0">
            <Film className="w-20 h-20 text-neutral-400 dark:text-neutral-800" />
          </div>
        </div>

        <div className="reveal reveal-delay-3 w-full max-w-3xl mx-auto mt-20 md:mt-24 mask-edges">
          <p className="text-xs md:text-sm font-medium text-neutral-500 mb-6 uppercase tracking-widest">
            Designed for all your platforms
          </p>
          <div className="overflow-hidden relative flex">
            <div className="flex w-[200%] animate-marquee">
              <div className="flex w-1/2 justify-around items-center text-neutral-400 dark:text-neutral-700">
                <PlaySquare className="w-8 h-8" />
                <Tv className="w-8 h-8" />
                <Clapperboard className="w-8 h-8" />
                <MonitorPlay className="w-8 h-8" />
                <Film className="w-8 h-8" />
                <Smartphone className="w-8 h-8" />
              </div>
              <div className="flex w-1/2 justify-around items-center text-neutral-400 dark:text-neutral-700">
                <PlaySquare className="w-8 h-8" />
                <Tv className="w-8 h-8" />
                <Clapperboard className="w-8 h-8" />
                <MonitorPlay className="w-8 h-8" />
                <Film className="w-8 h-8" />
                <Smartphone className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="py-16 md:py-24 max-w-6xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 text-neutral-900 dark:text-white">
            A studio in your browser.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg font-light">
            Everything you need to move from raw footage to published.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="reveal md:col-span-2 group relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-4xl p-8 md:p-10 overflow-hidden">
            <div className="absolute -right-12.5 -top-12.5 w-64 h-64 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
              <Layout className="w-20 h-20 text-neutral-300 dark:text-neutral-700" />
            </div>
            <div className="relative z-10">
              <div className="bg-neutral-100 dark:bg-neutral-900 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 border border-neutral-200 dark:border-neutral-800">
                <Layout className="w-7 h-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3 text-neutral-900 dark:text-white">
                Visual Pipeline
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-light leading-relaxed">
                Drag and drop your videos across customizable stages.
              </p>
            </div>
          </div>

          <div className="reveal md:col-span-1 group relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-4xl p-8 md:p-10 overflow-hidden">
            <div className="relative z-10">
              <div className="bg-neutral-100 dark:bg-neutral-900 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 border border-neutral-200 dark:border-neutral-800">
                <Wand2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-medium tracking-tight mb-3 text-neutral-900 dark:text-white">
                AI Copilot
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-light leading-relaxed">
                Generate high-converting titles instantly.
              </p>
            </div>
          </div>

          <div className="reveal md:col-span-1 group relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-4xl p-8 md:p-10 overflow-hidden">
            <Database className="absolute -right-5 -bottom-5 w-32 h-32 text-neutral-100 dark:text-neutral-900" />
            <div className="relative z-10">
              <div className="bg-neutral-100 dark:bg-neutral-900 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 border border-neutral-200 dark:border-neutral-800">
                <Database className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-medium tracking-tight mb-3 text-neutral-900 dark:text-white">
                Enterprise Grade
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-light leading-relaxed">
                Built on a robust PostgreSQL architecture.
              </p>
            </div>
          </div>

          <div className="reveal md:col-span-2 group relative bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-4xl p-8 md:p-10 overflow-hidden">
            <Eye className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 text-neutral-300 dark:text-neutral-800 opacity-60" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3 text-neutral-900 dark:text-white">
                Time-coded Feedback
              </h3>
              <p className="text-neutral-700 dark:text-neutral-400 text-base md:text-lg font-light leading-relaxed mb-6">
                Leave frame-by-frame comments for your editors.
              </p>
              <button className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 px-6 py-3 rounded-full font-medium text-sm">
                Explore Workspaces
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-16 md:py-24 max-w-4xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 space-y-12 relative text-left">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white mb-10">
              How it works
            </h2>
            <div className="absolute left-6.75 top-25 bottom-10 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></div>
            <div className="reveal flex gap-8 items-start relative z-10">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white">
                  1. Drop the rough cut
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 font-light text-lg">
                  Upload raw footage and tag your team.
                </p>
              </div>
            </div>
            <div className="reveal flex gap-8 items-start relative z-10">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white">
                  2. Review & Refine
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 font-light text-lg">
                  Leave comments directly on the cards.
                </p>
              </div>
            </div>
          </div>
          <div className="reveal md:col-span-2 bg-white dark:bg-[#111] p-3 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-lg">
            <div className="w-full h-64 bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center relative overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <Clapperboard className="w-16 h-16 text-neutral-300 dark:text-neutral-800" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 reveal">
        <div className="bg-neutral-200 dark:bg-[#111] border border-neutral-300 dark:border-neutral-800 rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-6xl font-medium tracking-tight mb-6 text-neutral-900 dark:text-white">
              Ready to ship faster?
            </h2>
            <p className="text-base md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Join the waitlist and start managing your video pipelines today.
            </p>
            <MagneticButton
              className="mx-auto"
              onClick={() => navigate("/auth")}
            >
              <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xl font-medium px-10 py-5 rounded-full flex items-center justify-center gap-3">
                <Rocket className="w-6 h-6" /> Get Started for Free
              </div>
            </MagneticButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] pt-12 md:pt-16 pb-8 transition-colors duration-500 relative z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-neutral-900 dark:bg-white p-1.5 rounded-md shadow-sm">
                <Layout className="w-4 h-4 text-white dark:text-zinc-900" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                FrameLink
              </span>
            </div>
            <div className="flex gap-6 md:gap-8 text-sm font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-widest">
              <a
                href="#"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Discord
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-xs md:text-sm text-neutral-500 font-light">
            <p>
              © {new Date().getFullYear()} FrameLink Inc. Built for the modern
              creator.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
