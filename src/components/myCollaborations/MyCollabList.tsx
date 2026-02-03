"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { usePlayerDetails } from "@/utils/UserSession";
import { ApiCollaboration } from "@/types/api";
import { getUserImageSrc } from "@/utils/imageUtils";
import { RootState, useAppDispatch } from "@/store";
import {
  acceptCollab,
  loadMyCollabs,
  rejectCollab,
  resetMyCollabs,
} from "@/store/collaborations";
import { useSelector } from "react-redux";
import InfiniteScroll from "../common/InfiniteScroll";
import CollabSkeleton from "./CollabsSkeleton";

type Props = {
  userId: number;
};

const PAGE_SIZE = 10;

const MyCollaborationsList = ({ userId }: Props) => {
  const [selectedCollab, setSelectedCollab] = useState<ApiCollaboration | null>(
    null
  );

  const { playerDetails } = usePlayerDetails();
  const dispatch = useAppDispatch();

  const {
    myCollabs: { items: collabs, loading, hasMore, page },
  } = useSelector((state: RootState) => state.collabs);

  // Initial load
  useEffect(() => {
    dispatch(resetMyCollabs());
    dispatch(
      loadMyCollabs({
        userId: userId,
        page: 0,
        size: PAGE_SIZE,
      })
    );
  }, [dispatch, userId]);

  const handleAccept = (collabId: number) => {
    if (!playerDetails?.id) return;
    dispatch(acceptCollab({ collabId, userId: playerDetails?.id }));
    setSelectedCollab(null);
  };

  const handleReject = (collabId: number) => {
    if (!playerDetails?.id) return;
    dispatch(rejectCollab({ collabId, userId: playerDetails?.id }));
    setSelectedCollab(null);
  };

  return (
    <InfiniteScroll
      className="space-y-3"
      loading={loading}
      hasMore={hasMore}
      list={collabs}
      onLoadMore={() =>
        dispatch(
          loadMyCollabs({
            userId: userId,
            page: page + 1,
            size: PAGE_SIZE,
          })
        )
      }
      loader={Array.from({ length: 10 }).map((_, i) => (
        <CollabSkeleton key={i} />
      ))}
      emptyMessage={
        <p className="text-xs text-gray-500 text-center py-4">
          No Invites yet.
        </p>
      }>
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

            {isOpen && playerDetails && (
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleAccept(collab.id)}
                  className="flex items-center gap-1 px-3 h-6 text-xs rounded-full
                    bg-green-700 text-white
                    hover:bg-green-800 transition">
                  <Check size={18} />
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() => handleReject(collab.id)}
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
    </InfiniteScroll>
  );
};

export default MyCollaborationsList;
