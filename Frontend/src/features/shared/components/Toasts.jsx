import { ToastContext } from "../context/toast.context";
import { useContext } from "react";

import { CheckCircle } from "lucide-react";

const Toasts = () => {
  const { toasts } = useContext(ToastContext);

  return (
    <div className="fixed bottom-8 right-8 z-300 flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-[fadeIn_0.3s_ease-out] border border-neutral-800 dark:border-neutral-200"
        >
          <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-600" />
          <span className="text-sm font-medium">{t.msg}</span>
        </div>
      ))}
    </div>
  );
};

export default Toasts;
