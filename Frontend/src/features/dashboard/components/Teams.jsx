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
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import Header from "../../shared/components/Header";
import { toast } from "react-toastify";

// Fake data
const teamMembers = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@creator.com",
    role: "Owner",
    status: "Active",
    avatar: "JD",
  },
  {
    id: 2,
    name: "Alex Chen",
    email: "alex.edits@gmail.com",
    role: "Editor",
    status: "Active",
    avatar: "AC",
  },
  {
    id: 3,
    name: "Sarah Smith",
    email: "sarah@creator.com",
    role: "Reviewer",
    status: "Invited",
    avatar: "SS",
  },
  {
    id: 4,
    name: "Mike Johnson",
    email: "mike.audio@gmail.com",
    role: "Editor",
    status: "Active",
    avatar: "MJ",
  },
];

const Teams = () => {
  const { mousePos, setIsSidebarOpen, toggleNotif } = useOutletContext();

  return (
    <>
      <Header
        header={{
          name: "Team Management",
          label: <Mail className="w-4 h-4" />,
          labelName: "Invite Member",
          onclick: () => toast.info("Invite link sent to team member!"),
        }}
        l
        setIsSidebarOpen={setIsSidebarOpen}
        toggleNotif={toggleNotif}
      />

      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-neutral-100 dark:bg-neutral-900 p-2 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <Users className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              </div>
            </div>
            <h3 className="text-4xl font-medium tracking-tight mb-1 text-neutral-900 dark:text-white">
              4 / 5
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
                  {teamMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-bold text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
                            {member.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-neutral-900 dark:text-white">
                              {member.name}
                            </div>
                            <div className="text-sm text-neutral-500">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {member.role === "Owner" && (
                            <Crown className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                          )}
                          {member.role === "Editor" && (
                            <Video className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                          )}
                          {member.role === "Reviewer" && (
                            <User className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                          )}
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            {member.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${member.status === "Active" ? "bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100" : "bg-transparent border-neutral-300 dark:border-neutral-700 text-neutral-500"}`}
                        >
                          {member.status === "Active" && (
                            <CheckCircle className="w-3 h-3 mr-1.5" />
                          )}
                          {member.status === "Invited" && (
                            <Clock className="w-3 h-3 mr-1.5" />
                          )}
                          {member.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
