import { ArrowRight, Mail, X } from "lucide-react";
import { useRef, useState } from "react";
import MagneticButton from "../../shared/components/MagnetButton";

const EmailVerifyModal = ({
  email,
  setShowVerifyModal,
  handleVerifyEmail,
  handleResendVerification,
  actionLoading,
}) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");

    if (fullCode.length !== 4) {
      return;
    }

    await handleVerifyEmail({ email, code: fullCode });
  };

  const handleResend = async () => {
    await handleResendVerification({ email });
    setCode(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Frosted Glass Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => !actionLoading && setShowVerifyModal(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-4xl p-8 w-full max-w-md shadow-2xl animate-[fadeIn_0.3s_ease-out]">
        <button
          onClick={() => setShowVerifyModal(false)}
          disabled={actionLoading}
          className="absolute top-6 right-6 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-8 pt-2">
          <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-full mb-5 shadow-sm border border-neutral-200 dark:border-neutral-800">
            <Mail className="w-8 h-8 text-neutral-900 dark:text-white" />
          </div>
          <h2 className="text-2xl font-medium tracking-tight mb-2 text-neutral-900 dark:text-white">
            Verify your email
          </h2>
          <p className="text-neutral-500 font-light text-center text-sm">
            We sent a 4-digit code to <strong>{email}</strong>. Enter it below
            to secure your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between gap-3 md:gap-4 px-2">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={code[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={actionLoading}
                className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-medium bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
              />
            ))}
          </div>

          <MagneticButton>
            <button
              type="submit"
              disabled={actionLoading || code.join("").length !== 4}
              className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-950 font-medium py-3.5 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 disabled:bg-neutral-400 dark:disabled:bg-neutral-400 disabled:cursor-not-allowed"
            >
              {actionLoading ? "Verifying..." : "Verify & Continue"}{" "}
              {!actionLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </MagneticButton>

          <div className="text-center text-sm text-neutral-500 font-light">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={actionLoading}
              className="text-neutral-900 dark:text-white font-medium hover:underline disabled:opacity-50"
            >
              Click to resend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerifyModal;
