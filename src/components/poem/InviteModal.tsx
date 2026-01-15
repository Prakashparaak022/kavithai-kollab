"use client";

import { Check, Copy, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { invitedUsers } from "@/data/invite";
import { InviteUser } from "@/types/invite";
import { motion } from "framer-motion";

type Props = {
  onClose: () => void;
};

const InviteModal = ({ onClose }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [invited, setInvited] = useState<Set<string>>(new Set());

  const filteredUsers = useMemo(() => {
    return invitedUsers.filter(
      (u) =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleInvite = (author: string) => {
    if (invited.has(author)) return;

    setInvited((prev) => new Set(prev).add(author));
    toast.success(`Invite sent to ${author}`);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText("kollab.com/invite/eternal-echoes");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-secondary rounded-2xl p-4 shadow-xl relative">
        {" "}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>
        <h2 className="font-semibold text-gray-200 text-center text-2xl mb-6">
          Invite a Collaborator
        </h2>
        <div className="bg-primary p-4 rounded-xl">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6a7a78] w-5 h-5" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by username or handle..."
              className="w-full pl-12 pr-4 py-3 bg-primary rounded-xl text-gray-600 border border-[#d4c4b3] focus:outline-none focus:border-[#2c5f5d]"
            />
          </div>

          <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
            {filteredUsers.map((user: InviteUser) => {
              const isInvited = invited.has(user.author);

              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-primary p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.imageUrl}
                      className="w-11 h-11 rounded-full object-cover"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">
                          {user.username}
                        </span>
                        <span className="text-xs px-2 py-[2px] rounded-full bg-[#f5c16c] text-[#7a4b00]">
                          {user.badge}
                        </span>
                      </div>
                      <span className="text-xs text-[#6a7a78]">
                        {user.author}
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={isInvited}
                    onClick={() => handleInvite(user.author)}
                    className={`px-4 h-8 rounded-full text-sm text-white transition
                      ${
                        isInvited
                          ? "bg-highlight cursor-not-allowed"
                          : "bg-secondary hover:bg-[#2c5f5d]"
                      }`}>
                    {isInvited ? "Invited" : "Invite"}
                  </button>
                </div>
              );
            })}
          </div>

          <div>
            <h3 className="text-[#3a4a48] mb-3">Copy Invite Link</h3>
            <div className="flex gap-3">
              <input
                readOnly
                value="kollab.com/invite/eternal-echoes"
                className="flex-1 px-4 h-8 bg-primary rounded-lg text-[#6a7a78] border border-[#d4c4b3]"
              />
              <button
                onClick={handleCopyLink}
                className="bg-[#2c5f5d] text-white px-6 h-8 rounded-full flex items-center gap-2 hover:bg-[#3d706e] transition">
                {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                {copiedLink ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InviteModal;
