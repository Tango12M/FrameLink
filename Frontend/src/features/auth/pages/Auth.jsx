import { useState, useRef, useContext } from "react";
import {
  Layout,
  Mail,
  Lock,
  ArrowLeft,
  User,
  Eye,
  EyeOff,
  Sun,
  Moon,
} from "lucide-react";
import MagneticButton from "../../shared/components/MagnetButton";
import EmailVerifyModal from "../components/EmailVerifyModal";
import { ThemeContext } from "../../../app/theme.context";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false); // Defaults to Register
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false); // Controls the Pop-up
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Triggers the Verification Pop-up
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setShowVerifyModal(true);
  };

  // Logs the user into the app and sends them to the Setup screen!
  const handleVerifySubmit = (e) => { 
    e.preventDefault();
    setShowVerifyModal(false);
    navigate("/setup"); // <-- We changed this from "/" to "/setup"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-50 font-sans selection:bg-neutral-500/30 overflow-hidden relative px-4 transition-colors duration-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      {/* --- EMAIL VERIFICATION MODAL (POP-UP) --- */}
      {showVerifyModal && (
        <EmailVerifyModal
          setShowVerifyModal={setShowVerifyModal}
          handleVerifySubmit={handleVerifySubmit}
        />
      )}

      {/* Top Controls */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
        Back to Home
      </button>

      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:scale-110 transition-all duration-300 shadow-sm"
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Main Auth Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="w-full max-w-md relative z-10 bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-2xl overflow-hidden animate-[fadeIn_0.5s_ease-out]"
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 dark:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.03), transparent 40%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-neutral-900 dark:bg-white p-3 rounded-2xl mb-4 shadow-sm transform transition-transform hover:scale-105 duration-300">
              <Layout className="w-8 h-8 text-white dark:text-neutral-900" />
            </div>
            <h2 className="text-3xl font-medium tracking-tight mb-2 text-neutral-900 dark:text-white">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-neutral-500 font-light text-center">
              {isLogin
                ? "Enter your details to access your workspace."
                : "Start shipping better videos faster."}
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={isLogin ? handleVerifySubmit : handleRegisterSubmit}
          >
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${isLogin ? "max-h-0 opacity-0" : "max-h-25 opacity-100"}`}
            >
              <div className="space-y-1.5 pb-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-neutral-900 dark:group-focus-within:text-neutral-200 transition-colors" />
                  <input
                    required={!isLogin}
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-neutral-900 dark:group-focus-within:text-neutral-200 transition-colors" />
                <input
                  required
                  type="email"
                  placeholder="you@creator.com"
                  className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
                  Password
                </label>
                {isLogin && (
                  <a
                    href="#"
                    className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-neutral-900 dark:group-focus-within:text-neutral-200 transition-colors" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 pl-12 pr-12 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <MagneticButton>
                <button type="submit" className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-950 font-medium py-3.5 rounded-xl transition-colors shadow-lg">
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </MagneticButton>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setShowPassword(false);
              }}
              className="text-neutral-900 dark:text-white font-medium hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;