const Notifications = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-150"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="fixed top-20 right-6 md:right-10 z-160 w-80 bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-3xl p-5 animate-[fadeIn_0.2s_ease-out]">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-medium text-neutral-900 dark:text-white text-lg">
            Notifications
          </h3>
          <span className="bg-blue-500/10 text-blue-500 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            2 New
          </span>
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-100 dark:border-neutral-800/50">
            <p className="text-sm text-neutral-900 dark:text-neutral-200 leading-relaxed">
              <span className="font-semibold text-neutral-900 dark:text-white">
                Alex Chen
              </span>{" "}
              left a time-coded comment on{" "}
              <span className="font-medium italic">Tokyo Drift Vlogs</span>
            </p>
            <p className="text-xs text-neutral-500 mt-2 font-medium">
              2 mins ago
            </p>
          </div>
          <div className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-2xl transition-colors cursor-pointer border border-transparent">
            <p className="text-sm text-neutral-900 dark:text-neutral-200 leading-relaxed">
              Render complete:{" "}
              <span className="font-medium italic">M4 Mac Review_v2.mp4</span>
            </p>
            <p className="text-xs text-neutral-500 mt-2 font-medium">
              1 hour ago
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
