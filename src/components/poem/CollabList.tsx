"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, UserRoundPlusIcon, X } from "lucide-react";
import { usePlayerDetails } from "@/utils/UserSession";
import useRequireAuth from "@/hooks/useRequireAuth";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { addCollab, decisionCollab, loadCollabs } from "@/store/collaborations";
import { toast } from "react-toastify";
import { ApiCollaboration, ApiPoem } from "@/types/api";
import { getUserImageSrc } from "@/utils/imageUtils";
import Loader from "../ui/Loader";
import CustomModal from "../ui/CustomModal";
import CollabApproveCard from "./CollabApproveCard";
import { fetchPoemById } from "@/services/api/poems.service";

type Props = {
  poem: ApiPoem;
  onPoemRefresh: (updatedPoem: ApiPoem) => void;
  onInvite: () => void;
};

const CollaborationsList = ({ poem, onPoemRefresh, onInvite }: Props) => {
  const [selectedCollab, setSelectedCollab] = useState<ApiCollaboration | null>(
    null
  );
  const [activeCollab, setActiveCollab] = useState<ApiCollaboration | null>(
    null
  );
  const [content, setContent] = useState("");
  const [showInput, setShowInput] = useState<boolean>(false);

  const { collabs, loading, addLoading } = useSelector(
    (state: RootState) => state.collabs
  );

  const dispatch = useAppDispatch();
  const { playerDetails } = usePlayerDetails();
  const { withAuth } = useRequireAuth();

  useEffect(() => {
    dispatch(loadCollabs({ postId: poem.id }));
  }, [dispatch, poem.id]);

  const handleAddCollaboration = () => {
    if (!content.trim() || addLoading || !playerDetails?.id) return;

    dispatch(
      addCollab({
        postId: 37,
        userId: 42,
        content,
      })
    )
      .unwrap()
      .then(() => setContent(""))
      .catch(() => toast.error("Failed to add collaboration"));
  };

  const handleApproveCollab = (updatedContent: string) => {
    {
      if (!activeCollab || !playerDetails?.id) return;

      dispatch(
        decisionCollab({
          collabId: activeCollab.id,
          ownerId: playerDetails.id,
          updatedContent,
          status: "APPROVED",
        })
      )
        .unwrap()
        .then(async () => {
          const updatedPoem = await fetchPoemById({
            poemId: poem.id,
            userId: playerDetails.id,
          });

          onPoemRefresh(updatedPoem);
        });

      setActiveCollab(null);
      setSelectedCollab(null);
    }
  };

  const isPoemOwner = poem.userId === playerDetails?.id;

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-lg font-semibold text-green">
          Collaboration Lines
        </h3>
        <button
          onClick={onInvite}
          className="flex items-center gap-1 px-3 h-8 bg-highlight rounded-full cursor-pointer outline-none">
          Invite <UserRoundPlusIcon size={15} />
        </button>
      </div>

      <div className="space-y-3">
        {/* ADD COLLABORATION */}
        {!isPoemOwner && (
          <div
            className="p-3 rounded-lg bg-card cursor-pointer
                 hover:shadow-md transition-shadow">
            {!showInput ? (
              <button
                onClick={withAuth(() => setShowInput(true))}
                className="text-sm text-blue-500 hover:underline">
                + Add your line to this poem
              </button>
            ) : (
              <div className="space-y-1">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                  placeholder="Write your line..."
                  className="w-full text-sm text-gray-700 p-3 rounded-md border-primary
                   focus:outline-none focus:ring-1 focus:ring-green-700"
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleAddCollaboration}
                    className="px-4 py-1.5 text-sm rounded-md
                     bg-secondary text-white">
                    Submit
                  </button>

                  <button
                    onClick={() => {
                      setShowInput(false);
                      setContent("");
                    }}
                    className="px-4 py-1.5 text-sm rounded-md
                     bg-highlight text-white">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {collabs.map((collab) => {
          const isOpen = selectedCollab?.id === collab.id;

          return (
            <div
              key={collab.id}
              onClick={() =>
                setSelectedCollab((prev) =>
                  prev?.id === collab.id ? null : collab
                )
              }
              role="button"
              tabIndex={0}
              className="p-3 rounded-lg bg-card cursor-pointer
                 hover:shadow-md transition-shadow
                 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={getUserImageSrc(collab.authorImage)}
                      alt={collab.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-blue-500">
                      {collab.author}
                    </span>
                  </div>

                  {/* TEXT */}
                  <motion.p
                    initial={false}
                    animate={{ opacity: 1 }}
                    className={`text-sm mt-2 text-gray-700
                      ${isOpen ? "" : "line-clamp-1"}`}>
                    {collab.content}
                  </motion.p>
                </div>

                {/* ARROW */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-6 h-6 bg-[#e7e1c7] rounded-full
                     flex items-center justify-center shrink-0">
                  <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                </motion.div>
              </div>
              {isOpen && playerDetails?.id && (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCollab(collab);
                      setSelectedCollab(null);
                    }}
                    className="flex items-center gap-1 px-3 h-6 text-xs rounded-full
                    bg-green-700 text-white
                    hover:bg-green-800 transition">
                    <Check size={18} />
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        decisionCollab({
                          collabId: collab.id,
                          ownerId: playerDetails.id,
                          status: "REJECTED",
                        })
                      );
                    }}
                    className="flex items-center gap-1 px-3 h-6 text-xs rounded-full
                    bg-red-700 text-white
                    hover:bg-red-800 transition">
                    <X size={18} />
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {activeCollab && (
        <CustomModal
          title="Accept Collaboration"
          onClose={() => setActiveCollab(null)}>
          <CollabApproveCard
            title={poem.title}
            poemContent={poem.content ?? ""}
            collabContent={activeCollab.content}
            handleApprove={handleApproveCollab}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default CollaborationsList;
