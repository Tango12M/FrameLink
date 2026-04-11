import { useContext } from "react"; 
import {
  deleteAccount,
  getMe,
  login,
  logoutUser,
  register,
  resendVerificationEmail,
  verifyEmail,
} from "../services/auth.api";
import { AuthContext } from "../auth.context";
import { toast } from "react-toastify";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { actionLoading, authLoading, setActionLoading, user, setUser } =
    context;

  async function handleRegister({ email, username, password }) {
    setActionLoading(true);
    try {
      const data = await register({ email, username, password });
      toast.success(data.message);
      sessionStorage.setItem("pendingEmail", email);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleLogin({ email, password }) {
    setActionLoading(true);
    try {
      const data = await login({ email, password });
      toast.success(data.message);
      setUser(data.user);
      sessionStorage.removeItem("pendingEmail");

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleLogout() {
    setActionLoading(true);
    try {
      const data = await logoutUser();
      setUser(null);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDeleteAccount() {
    setActionLoading(true);
    try {
      const data = await deleteAccount();
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleGetMe() {
    setActionLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);

      return data;
    } catch (error) {
      setUser(null);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleVerifyEmail({ email, code }) {
    setActionLoading(true);
    try {
      const data = await verifyEmail({ email, code });
      toast.success(data.message);
      setUser(data.user);
      sessionStorage.removeItem("pendingEmail");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid verification code");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleResendVerification({ email }) {
    setActionLoading(true);
    try {
      const data = await resendVerificationEmail({ email });
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  }

  return {
    actionLoading,
    authLoading,
    user,
    handleRegister,
    handleLogin,
    handleLogout,
    handleDeleteAccount,
    handleGetMe,
    handleVerifyEmail,
    handleResendVerification,
  };
};
