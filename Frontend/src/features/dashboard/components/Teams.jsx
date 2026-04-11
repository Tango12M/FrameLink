import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  Crown,
  Folder,
  Mail,
  MoreHorizontal,
  Shield,
  User,
  Users,
  Video,
  X,
  Copy,
  Link,
  Trash2,
  UserCog,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  createInviteLink,
  updateProjectMemberRole,
} from "../services/dashboard.api";

const Teams = () => {
  const { mousePos, activeProject } = useOutletContext();

  const [members, setMembers] = useState([]);
  const [inviteLink, setInviteLink] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (!activeProject?.members) {
      setMembers([]);
      return;
    }

    setMembers(
      activeProject.members.map((member) => ({
        ...member,
        id: member.user?._id || member.user,
      })),
    );
  }, [activeProject]);

  const handleCopyLink = () => {
    if (!inviteLink) {
      toast.error("Generate an invite link first.");
      return;
    }
    navigator.clipboard.writeText(inviteLink);
    toast.info("Invite link copied to clipboard!");
  };

  const handleCreateInviteLink = async () => {
    if (!activeProject?.id) {
      toast.error("Select a project before creating an invite link.");
      return;
    }

    try {
      const data = await createInviteLink({ projectId: activeProject.id });
      setInviteLink(data.link || "");
      toast.success(data.message || "Invite link created successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to create invite link",
      );
    }
  };

  const { user } = useAuth();
  const currentUserId = user?._id || user?.id;

  const handleOpenManage = (user) => {
    if (user.id === currentUserId) {
      toast.info("You cannot change your own role. Contact another admin.");
      return;
    }
    setSelectedUser(user);
    setSelectedRole(user.role || "none");
    setIsManageModalOpen(true);
  };

  const handleSaveRole = async () => {
    if (!selectedUser || !activeProject?.id) {
      toast.error("No user selected.");
      return;
    }

    try {
      const response = await updateProjectMemberRole({
        projectId: activeProject.id,
        userId: selectedUser.id,
        role: selectedRole,
      });

      const updatedMembers = response.project?.members || [];
      setMembers(
        updatedMembers.map((member) => ({
          ...member,
          id: member.user?._id || member.user,
        })),
      );
      setSelectedUser(null);
      setIsManageModalOpen(false);
      toast.success(response.message || "Role updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to update role",
      );
    }
  };

  const handleRemoveUser = () => {
    // Safety check: Removing members is not supported by the current backend API.
    toast.error("Removing members is not supported by the current backend API.");
    setIsManageModalOpen(false);
  };
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 relative">
      
      {/* --- INVITE MODAL --- */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsInviteModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-6 md:p-8 w-full max-w-md shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border border-neutral-200 dark:border-neutral-800">
                  <Link className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </div>
                <h3 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-white">
                  Invite Member
                </h3>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              Generate a secure invite link for the current project. New members join with a default backend role of "none".
            </p>

            <div className="flex items-center gap-2 mb-8">
              <div className="flex-1 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400 font-mono overflow-hidden text-ellipsis whitespace-nowrap">
                {inviteLink}
              </div>
              <button 
                onClick={handleCopyLink}
                className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition-colors"
                title="Copy Link"
              >
                <Copy className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              </button>
            </div>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInviteLink}
                className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity shadow-sm"
              >
                Generate Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MANAGE USER MODAL --- */}
      {isManageModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsManageModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-6 md:p-8 w-full max-w-md shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border border-neutral-200 dark:border-neutral-800">
                  <UserCog className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-white leading-tight">
                    Manage {selectedUser.name || selectedUser.id}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {selectedUser.email || selectedUser.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsManageModalOpen(false)}
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Workspace Role
              </label>
              <div className="grid grid-cols-1 gap-2">
                {["admin", "editor", "reviewer", "none"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${
                      selectedRole === role 
                        ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-900" 
                        : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {role === "admin" && <Crown className={`w-4 h-4 ${selectedRole === role ? "text-neutral-900 dark:text-white" : "text-neutral-500"}`} />}
                      {role === "editor" && <Video className={`w-4 h-4 ${selectedRole === role ? "text-neutral-900 dark:text-white" : "text-neutral-500"}`} />}
                      {role === "reviewer" && <User className={`w-4 h-4 ${selectedRole === role ? "text-neutral-900 dark:text-white" : "text-neutral-500"}`} />}
                      {role === "none" && <Shield className={`w-4 h-4 ${selectedRole === role ? "text-neutral-900 dark:text-white" : "text-neutral-500"}`} />}
                      <span className={`font-medium ${selectedRole === role ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400"}`}>
                        {role === "none" ? "Viewer" : role.charAt(0).toUpperCase() + role.slice(1)}
                      </span>
                    </div>
                    {selectedRole === role && <CheckCircle className="w-4 h-4 text-neutral-900 dark:text-white" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full pt-4 border-t border-neutral-200 dark:border-neutral-800">
              {selectedUser.id === currentUserId && (
                <div className="rounded-2xl bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 p-4 text-sm text-yellow-700 dark:text-yellow-300">
                  You cannot change your own role. Contact another admin to make this change.
                </div>
              )}
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={() => setIsManageModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl text-neutral-600 dark:text-neutral-400 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRole}
                  disabled={selectedUser.id === currentUserId}
                  className="py-2.5 px-5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- PAGE CONTENT --- */}
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-white">
          Team Management
        </h2>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
        >
          <Mail className="w-4 h-4" /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-neutral-100 dark:bg-neutral-900 p-2 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <Users className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </div>
          </div>
          <h3 className="text-4xl font-medium tracking-tight mb-1 text-neutral-900 dark:text-white">
            {members.length} / 5
          </h3>
          <p className="text-sm text-neutral-500 font-medium">Seats Filled</p>
        </div>
        <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-neutral-100 dark:bg-neutral-900 p-2 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <Folder className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </div>
          </div>
          <h3 className="text-4xl font-medium tracking-tight mb-1 text-neutral-900 dark:text-white">
            124 GB
          </h3>
          <p className="text-sm text-neutral-500 font-medium">
            Storage Used (500GB Limit)
          </p>
        </div>
        <div className="bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-neutral-300 dark:bg-neutral-800 p-2 rounded-xl border border-neutral-400 dark:border-neutral-700">
              <Shield className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
            </div>
          </div>
          <h3 className="text-4xl font-medium tracking-tight mb-1 text-neutral-900 dark:text-white">
            Pro
          </h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-400 font-medium">
            Current Plan
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-sm relative">
          <div
            className="pointer-events-none absolute -inset-px opacity-0 hover:opacity-100 transition duration-500 z-10"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.02), transparent 80%)`,
            }}
          />
          <div className="overflow-x-auto relative z-20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                  <th className="px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-widest">
                    Member
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-widest">
                    Role
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group animate-[fadeIn_0.3s_ease-out]"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-bold text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
                          {member.user?.username?.slice(0, 2).toUpperCase() || (member.id || "?").toString().slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900 dark:text-white">
                            {member.user?.username || member.user?.name || `User ${member.id?.toString().slice(-6)}`}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {member.user?.email || member.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {member.role === "admin" && (
                          <Crown className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                        )}
                        {member.role === "editor" && (
                          <Video className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                        )}
                        {member.role === "reviewer" && (
                          <User className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                        )}
                        {member.role === "none" && (
                          <Shield className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                        )}
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          {member.role === "none" ? "Viewer" : member.role?.charAt(0).toUpperCase() + member.role?.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100`}
                      >
                        <CheckCircle className="w-3 h-3 mr-1.5" />
                        Active
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {/* NEW: Trigger the manage modal */}
                      <button
                        onClick={() => handleOpenManage(member)}
                        disabled={member.id === currentUserId}
                        className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Fallback if somehow all members are deleted */}
            {members.length === 0 && (
              <div className="text-center py-12 text-neutral-500">
                <Users className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p>No team members found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;