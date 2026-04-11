import { useState, useEffect } from "react";
import {
  Layout,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import {
  getInviteDetails,
  acceptInvite,
} from "../../dashboard/services/dashboard.api";

const InvitePage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { user } = useAuth();

  const [inviteData, setInviteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [error, setError] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const fetchInviteDetails = async () => {
      if (!token) {
        setError("No invite token provided");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getInviteDetails(token);

        if (!data.success) {
          setIsExpired(data.expired);
          setError(data.message || "Invalid invite link");
          setIsLoading(false);
          return;
        }

        setInviteData({
          token,
          projectId: data.projectId,
          projectName: data.projectName,
          projectDescription: data.projectDescription,
        });
        setIsLoading(false);
      } catch (err) {
        setIsExpired(err.response?.data?.expired);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load invite details",
        );
        setIsLoading(false);
      }
    };

    fetchInviteDetails();
  }, [token]);

  const handleAccept = async () => {
    if (!user) {
      toast.error("Please log in first");
      navigate("/auth");
      return;
    }

    if (!inviteData?.token) return;

    setIsAccepting(true);
    try {
      const data = await acceptInvite({ token: inviteData.token });

      if (data.success) {
        toast.success(data.message || "Successfully joined the workspace!");
        navigate("/");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to join workspace",
      );
    } finally {
      setIsAccepting(false);
    }
  };

  const handleDecline = () => {
    navigate("/landing");
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 text-neutral-900 dark:text-white animate-spin" />
          <p className="text-neutral-600 dark:text-neutral-400">
            Verifying invite link...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-50 font-sans flex flex-col relative overflow-hidden transition-colors duration-700">
      {/* Header */}
      <header className="sticky top-0 z-[100] w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-900 dark:bg-white p-1.5 rounded-lg shadow-sm">
            <Layout className="w-5 h-5 text-white dark:text-neutral-900" />
          </div>
          <span className="text-xl font-bold tracking-tighter">FrameLink</span>
        </div>
        <button
          onClick={() => navigate("/landing")}
          className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {error ? (
            <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6 border border-red-200 dark:border-red-800">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                {isExpired ? "Invite Expired" : "Invalid Invite"}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                {isExpired
                  ? "This invite link has expired. Please ask the project owner for a new one."
                  : "The invite link you're using is invalid or has already been used."}
              </p>
              <button
                onClick={() => navigate("/landing")}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity"
              >
                Return to Home
              </button>
            </div>
          ) : inviteData ? (
            <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 border border-green-200 dark:border-green-800">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>

              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white text-center mb-2">
                You're invited to join
              </h1>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-6">
                {inviteData.projectName}
              </h2>

              {inviteData.projectDescription && (
                <p className="text-neutral-600 dark:text-neutral-400 text-center mb-6 text-sm leading-relaxed">
                  {inviteData.projectDescription}
                </p>
              )}

              <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 mb-8">
                <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                  Joining as:
                </p>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {user?.username || user?.email || "Guest"}
                </p>
              </div>

              {!user && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    You'll be logged in with your current account when you accept.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={handleDecline}
                  className="py-3 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  disabled={isAccepting}
                  className="py-3 px-4 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAccepting ? "Joining..." : "Accept Invite"}
                </button>
              </div>

              <p className="text-xs text-neutral-500 text-center">
                By accepting, you agree to our Terms of Service
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InvitePage;
