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
import CustomModal from "../ui/CustomModal";
import { toast } from "react-toastify";
import ViewPoemCard from "./ViewPoemCard";
import { useRouter } from "next/navigation";
import { useInfiniteLoader } from "@/hooks/useInfiniteLoader";

type Props = {
  userId: number;
};

const PAGE_SIZE = 10;

const MyCollaborationsList = ({ userId }: Props) => {
  const router = useRouter();

  const [selectedCollab, setSelectedCollab] = useState<ApiCollaboration | null>(
    null
  );
  const [actionType, setActionType] = useState<"APPROVE" | "REJECT" | null>(
    null
  );

  const dispatch = useAppDispatch();

  const {
    myCollabs: { items: collabs, loading, hasMore, page },
  } = useSelector((state: RootState) => state.collabs);

  // Initial load
  useEffect(() => {
    dispatch(resetMyCollabs());
    dispatch(
      loadMyCollabs({
        userId,
        page: 0,
        size: PAGE_SIZE,
        status: "INVITED",
      })
    );
  }, [dispatch, userId]);

  const loadMoreMyCollabs = useInfiniteLoader(
    (page, size) => {
      dispatch(loadMyCollabs({ userId, status: "INVITED", page, size }));
    },
    page,
    PAGE_SIZE
  );

  const handleAccept = async (collabId: number) => {
    if (!selectedCollab) return;

    try {
      await dispatch(
        acceptCollab({
          collabId,
          userId,
        })
      ).unwrap();

      toast.success("Collaboration approved 🎉");
      setActionType("APPROVE");
    } catch {
      toast.error("Failed to approve collaboration");
    }
  };

  const handlePoemView = () => {
    if (!selectedCollab) return;
    router.push(`/poem/${selectedCollab.postId}?userId=${userId}`);
  };
  const handleConfirmReject = async () => {
    if (!selectedCollab) return;

    try {
      await dispatch(
        rejectCollab({
          collabId: selectedCollab.id,
          userId,
        })
      ).unwrap();

      toast.success("Collaboration rejected");
    } catch {
      toast.error("Failed to reject collaboration");
    } finally {
      setSelectedCollab(null);
      setActionType(null);
    }
  };
  return (
    <>
      <InfiniteScroll
        className="space-y-3"
        loading={loading}
        hasMore={hasMore}
        list={collabs}
        onLoadMore={loadMoreMyCollabs}
        loader={Array.from({ length: 10 }).map((_, i) => (
          <CollabSkeleton key={i} />
        ))}
        emptyMessage={
          <p className="text-green text-center py-4">No Invites yet.</p>
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
                    className={`text-sm mt-2 text-gray-700 ${
                      isOpen ? "" : "line-clamp-1"
                    }`}>
                    <span className="text-gray-600">
                      You’ve been invited to&nbsp;
                    </span>
                    <span className="font-semibold text-green">
                      {collab.postTitle}
                    </span>
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

              {isOpen && userId && (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(collab.id);
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
                      setActionType("REJECT");
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
      </InfiniteScroll>
      {selectedCollab && actionType === "APPROVE" && (
        <CustomModal
          title="Poem Preview"
          onClose={() => {
            setSelectedCollab(null);
            setActionType(null);
          }}>
          <ViewPoemCard
            title={selectedCollab.postTitle}
            username={selectedCollab.author}
            authorImage={selectedCollab.authorImage ?? ""}
            poemContent={selectedCollab.content ?? ""}
            handleApprove={handlePoemView}
          />
        </CustomModal>
      )}

      {selectedCollab && actionType === "REJECT" && (
        <CustomModal
          title="Reject Collaboration"
          onClose={() => {
            setSelectedCollab(null);
            setActionType(null);
          }}>
          <div className="relative rounded-lg !border-4 border-red-500 bg-secondary p-6 text-center">
            <h2 className="mb-3 text-lg text-[#e8dcc8]">Are you sure?</h2>

            <p className="mb-4 text-sm text-[#a8c4c2]">
              This collaboration invite will be permanently dismissed.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setSelectedCollab(null)}
                className="px-4 h-7 text-xs rounded-full bg-gray-500 text-white">
                Cancel
              </button>

              <button
                onClick={handleConfirmReject}
                className="px-4 h-7 text-xs rounded-full bg-red-600 text-white">
                Reject
              </button>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default MyCollaborationsList;
