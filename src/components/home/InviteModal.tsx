"use client";
import { Check, Copy, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const InviteModal = ({ showInviteModal = true }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState<Set<string>>(new Set());

  const handleInvite = (handle: string) => {
    if (invitedUsers.has(handle)) return;

    setInvitedUsers((prev) => {
      const next = new Set(prev);
      next.add(handle);
      return next;
    });

    toast.success(`Invite sent to ${handle}`);
  };

  const users = [
    {
      username: "@Bharathi",
      author: "@Bhronohi",
      badge: "Top Poet",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      username: "@heronohi",
      author: "@herovithi",
      badge: "Top Poet",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      username: "@user12",
      author: "@kaviarishi",
      badge: "Top Poet",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText("kollab.com/invite/eternal-echoes");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div>
      {/* Invite Modal */}
      {showInviteModal && (
        <div className="bg-secondary rounded-2xl p-4 shadow-xl">
          <h2 className="font-semibold text-gray-200 text-center text-2xl mb-6">
            Invite a Collaborator
          </h2>

          <div className="bg-primary p-4 rounded-xl">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6a7a78] w-5 h-5" />
              <input
                type="text"
                placeholder="Search by username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#f8f5e4] rounded-xl text-gray-600 placeholder:text-gray-500 border border-[#d4c4b3] focus:outline-none focus:border-[#2c5f5d]"
              />
            </div>

            {/* User List */}
            <div className="space-y-3 mb-6">
              {users.map((user, idx) => {
                const isInvited = invitedUsers.has(user.author);

                return (
                  <div
                    key={idx}
                    className="flex flex-wrap gap-2 items-center justify-between bg-[#f8f5e4] p-4 rounded-xl shadow-sm">
                    {/* Left section */}
                    <div className="flex items-center gap-3">
                      <img
                        src={user.image}
                        alt={user.username}
                        className="w-11 h-11 rounded-full object-cover"
                      />

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-600">
                            {user.username}
                          </span>

                          {/* Badge */}
                          <span className="text-xs font-medium px-2 py-[2px] rounded-full bg-[#f5c16c] text-[#7a4b00]">
                            {user.badge}
                          </span>
                        </div>

                        <span className="text-[#6a7a78] text-xs">
                          {user.author}
                        </span>
                      </div>
                    </div>

                    {/* Invite Button */}
                    <button
                      onClick={() => handleInvite(user.author)}
                      disabled={isInvited}
                      className={`px-4 h-8 rounded-full ${
                        isInvited ? "bg-highlight" : "bg-secondary"
                      } text-white text-sm font-medium transition`}>
                      {isInvited ? "Invited" : "Invite"}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Copy Invite Link */}
            <div>
              <h3 className="text-[#3a4a48] mb-3">Copy Invite Link</h3>
              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  value="kollab.com/invite/eternal-echoes"
                  readOnly
                  className="flex-1 px-4 h-8 bg-[#f8f5e4] rounded-lg text-[#6a7a78] border border-[#d4c4b3]"
                />
                <button
                  onClick={handleCopyLink}
                  className="bg-[#2c5f5d] text-white text-sm px-6 h-8 rounded-full hover:bg-[#3d706e] transition-colors flex items-center gap-2">
                  {copiedLink ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copiedLink ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteModal;
