import { ArrowRight, Mail, X } from "lucide-react";
import MagneticButton from "../../shared/components/MagnetButton";

const EmailVerifyModal = ({ setShowVerifyModal, handleVerifySubmit }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Frosted Glass Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowVerifyModal(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-4xl p-8 w-full max-w-md shadow-2xl animate-[fadeIn_0.3s_ease-out]">
        <button
          onClick={() => setShowVerifyModal(false)}
          className="absolute top-6 right-6 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
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
            We sent a 4-digit code to your email address. Enter it below to
            secure your account.
          </p>
        </div>

        <form onSubmit={handleVerifySubmit} className="space-y-8">
          <div className="flex justify-between gap-3 md:gap-4 px-2">
            {[1, 2, 3, 4].map((num) => (
              <input
                key={num}
                type="text"
                maxLength="1"
                className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-medium bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all shadow-inner"
              />
            ))}
          </div>

          <MagneticButton>
            <div className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-950 font-medium py-3.5 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2">
              Verify & Continue <ArrowRight className="w-4 h-4" />
            </div>
          </MagneticButton>

          <div className="text-center text-sm text-neutral-500 font-light">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-neutral-900 dark:text-white font-medium hover:underline"
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
