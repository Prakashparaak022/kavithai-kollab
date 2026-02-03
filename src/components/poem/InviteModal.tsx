"use client";

import { Check, Copy, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import InviteUserSkeleton from "./InviteUserSkeleton";
import { loadUserProfiles } from "@/store/userProfile/userProfile.thunks";
import { RootState,  useAppDispatch } from "@/store";
import { inviteCollab } from "@/store/collaborations";
import { ApiPoem } from "@/types/api";
import { usePlayerDetails } from "@/utils/UserSession";
import { resetUserProfiles } from "@/store/userProfile";
import { useDebounce } from "@/hooks/useDebounce";
import InfiniteScroll from "../common/InfiniteScroll";

type Props = {
  poem: ApiPoem;
  onClose: () => void;
};

const PAGE_SIZE = 25;

const InviteModal = ({ poem, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { playerDetails } = usePlayerDetails();

  const {
    items: userProfiles,
    loading,
    page,
    hasMore,
  } = useSelector((state: RootState) => state.userProfile);

  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [invited, setInvited] = useState<Set<number>>(new Set());
  const debouncedSearch = useDebounce(searchQuery, 400);

  // Initial load
  useEffect(() => {
    dispatch(resetUserProfiles());
    dispatch(
      loadUserProfiles({
        role: "USER",
        status: 1,
        page: 0,
        size: PAGE_SIZE,
        firstName: debouncedSearch,
      })
    );
  }, [dispatch, debouncedSearch]);

  const handleInvite = async (userId: number, name: string) => {
    if (!playerDetails?.id || invited.has(userId)) return;

    try {
      await dispatch(
        inviteCollab({
          postId: poem.id,
          ownerId: playerDetails.id,
          invitedUserId: userId,
        })
      ).unwrap();

      setInvited((prev) => new Set(prev).add(userId));
      toast.success(`Invite sent to ${name}`);
    } catch {
      toast.error("Failed to send invite");
    }
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
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="font-semibold text-gray-200 text-center text-2xl mb-6">
          Invite a Collaborator
        </h2>

        <div className="bg-app p-4 rounded-xl">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6a7a78] w-5 h-5" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or pen name..."
              className="w-full pl-12 pr-4 py-3 bg-card rounded-xl text-gray-600 border border-[#d4c4b3] focus:outline-none focus:border-[#2c5f5d]"
            />
          </div>

          <InfiniteScroll
            className="space-y-3 mb-6 max-h-[300px] overflow-y-auto"
            useWindowScroll={false}
            loading={loading}
            hasMore={hasMore}
            list={userProfiles}
            onLoadMore={() =>
              dispatch(
                loadUserProfiles({
                  role: "USER",
                  status: 1,
                  page: page + 1,
                  size: PAGE_SIZE,
                  firstName: debouncedSearch,
                })
              )
            }
            loader={Array.from({ length: 4 }).map((_, i) => (
              <InviteUserSkeleton key={i} />
            ))}
            emptyMessage={
              <p className="text-green text-center">
                No users found
              </p>
            }>
            {userProfiles.map((user) => {
              const isInvited = invited.has(user.id);

              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-card p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#2c5f5d] text-white flex items-center justify-center font-semibold">
                      {user.firstName[0].toUpperCase()}
                    </div>

                    <div>
                      <div className="font-semibold text-gray-700">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-[#6a7a78]">
                        @{user.penName || user.firstName}
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={isInvited}
                    onClick={() =>
                      handleInvite(user.id, user.penName || user.firstName)
                    }
                    className={`px-4 h-8 rounded-full text-sm text-white transition ${
                      isInvited
                        ? "bg-highlight cursor-not-allowed"
                        : "bg-secondary hover:bg-[#2c5f5d]"
                    }`}>
                    {isInvited ? "Invited" : "Invite"}
                  </button>
                </div>
              );
            })}
          </InfiniteScroll>

          <div>
            <h3 className="text-[#3a4a48] mb-3">Copy Invite Link</h3>
            <div className="flex gap-3">
              <input
                readOnly
                value="kollab.com/invite/eternal-echoes"
                className="flex-1 px-4 h-8 bg-card rounded-lg text-[#6a7a78] border border-[#d4c4b3]"
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
