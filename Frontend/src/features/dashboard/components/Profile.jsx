import { Bell, Camera, CreditCard, Shield, User, Zap } from "lucide-react";
import MagneticButton from "../../shared/components/MagnetButton";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../shared/components/Header";

const tabs = [
  { id: "general", label: "General", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing & Plan", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const Profile = () => {
  const context = useOutletContext();
  const { setActiveTab, setIsSidebarOpen, toggleNotif } = context;
  const activeTab = context?.activeTab || "general";

  return (
    <>
      <Header
        header={{ name: "Account Settings" }}
        setIsSidebarOpen={setIsSidebarOpen}
        toggleNotif={toggleNotif}
      />
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-1">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 px-3">
              Profile Details
            </h3>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Settings Content Area */}
          <div className="flex-1 bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm relative group overflow-hidden">
            <div
              className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500"
              style={{
                background: `radial-gradient(400px circle at center, rgba(255,255,255,0.02), transparent)`,
              }}
            />

            <div className="relative z-10 animate-[fadeIn_0.3s_ease-out]">
              {/* GENERAL TAB */}
              {activeTab === "general" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-medium tracking-tight mb-1 text-neutral-900 dark:text-white">
                      General Information
                    </h2>
                    <p className="text-neutral-500 font-light text-sm">
                      Update your photo and personal details here.
                    </p>
                  </div>

                  <div className="flex items-center gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="relative group cursor-pointer">
                      <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-3xl font-bold text-neutral-700 dark:text-neutral-300">
                        JD
                      </div>
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-3">
                        <button className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity">
                          Upload New
                        </button>
                        <button className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 font-medium px-4 py-2 rounded-xl text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Jane"
                        className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl py-2.5 px-4 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl py-2.5 px-4 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="jane.doe@creator.com"
                        className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl py-2.5 px-4 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    {/* TOAST TRIGGER */}
                    <MagneticButton
                      onClick={() =>
                        toast.info("Profile updated successfully!")
                      }
                    >
                      <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium px-6 py-3 rounded-xl shadow-lg">
                        Save Changes
                      </div>
                    </MagneticButton>
                  </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-medium tracking-tight mb-1 text-neutral-900 dark:text-white">
                      Security & Passwords
                    </h2>
                    <p className="text-neutral-500 font-light text-sm">
                      Keep your account and projects safe.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full max-w-md bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl py-2.5 px-4 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full max-w-md bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl py-2.5 px-4 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all"
                      />
                    </div>

                    {/* TOAST TRIGGER */}
                    <button
                      onClick={() =>
                        toast.info("Password updated successfully!")
                      }
                      className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium px-6 py-2.5 rounded-xl text-sm mt-2 hover:opacity-90"
                    >
                      Update Password
                    </button>
                  </div>

                  <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-neutral-900 dark:text-white font-medium mb-1">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-neutral-500 font-light">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <button className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 font-medium px-4 py-2 rounded-xl text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              )}

              {/* BILLING TAB */}
              {activeTab === "billing" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-medium tracking-tight mb-1 text-neutral-900 dark:text-white">
                      Billing & Plan
                    </h2>
                    <p className="text-neutral-500 font-light text-sm">
                      Manage your subscription and storage limits.
                    </p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
                    <Zap className="absolute -right-5 -top-5 w-32 h-32 text-neutral-200 dark:text-neutral-800 opacity-20" />
                    <div className="relative z-10 flex justify-between items-start">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
                          Pro Plan
                        </div>
                        <h3 className="text-3xl font-medium text-neutral-900 dark:text-white mb-1">
                          $29
                          <span className="text-lg text-neutral-500 font-light">
                            /mo
                          </span>
                        </h3>
                        <p className="text-sm text-neutral-500">
                          Renews on Oct 14, 2024
                        </p>
                      </div>
                      <button className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 font-medium px-4 py-2 rounded-xl text-sm shadow-sm hover:scale-105 transition-transform">
                        Manage Plan
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-medium tracking-tight mb-1 text-neutral-900 dark:text-white">
                      Notifications
                    </h2>
                    <p className="text-neutral-500 font-light text-sm">
                      Decide how CutBoard communicates with you.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
                      <div>
                        <h4 className="text-neutral-900 dark:text-white font-medium mb-1">
                          New Comments
                        </h4>
                        <p className="text-sm text-neutral-500 font-light">
                          When someone comments on your active videos.
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-neutral-900 dark:bg-white rounded-full flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white dark:bg-black rounded-full shadow-sm translate-x-6"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
                      <div>
                        <h4 className="text-neutral-900 dark:text-white font-medium mb-1">
                          Video Rendered
                        </h4>
                        <p className="text-sm text-neutral-500 font-light">
                          When a video finishes rendering or AI tagging.
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-neutral-900 dark:bg-white rounded-full flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white dark:bg-black rounded-full shadow-sm translate-x-6"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-neutral-900 dark:text-white font-medium mb-1">
                          Marketing Emails
                        </h4>
                        <p className="text-sm text-neutral-500 font-light">
                          Tips, tutorials, and new feature announcements.
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white dark:bg-neutral-500 rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
