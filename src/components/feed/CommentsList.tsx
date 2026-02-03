"use client";

import { RootState, useAppDispatch } from "@/store";
import { addComment, loadComments, resetComments } from "@/store/comments";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePlayerDetails } from "@/utils/UserSession";
import { toast } from "react-toastify";
import { getUserImageSrc } from "@/utils/imageUtils";
import { formatTimeAgo } from "@/utils";
import useRequireAuth from "@/hooks/useRequireAuth";
import InfiniteScroll from "../common/InfiniteScroll";
import CommentSkeleton from "../poem/CommentSkeleton";

type Props = {
  postId: number;
};

const PAGE_SIZE = 10;

const CommentsList = ({ postId }: Props) => {
  const [content, setContent] = useState("");

  const {
    items: comments,
    loading,
    page,
    hasMore,
    addLoading,
  } = useSelector((state: RootState) => state.comments);

  const dispatch = useAppDispatch();
  const { playerDetails } = usePlayerDetails();
  const { withAuth } = useRequireAuth();

  // Initial load
  useEffect(() => {
    dispatch(resetComments());
    dispatch(
      loadComments({
        postId,
        page: 0,
        size: PAGE_SIZE,
      })
    );
  }, [dispatch, postId]);

  const handleAddComment = () => {
    if (!content.trim() || addLoading || !playerDetails?.id) return;

    dispatch(
      addComment({
        postId,
        userId: playerDetails.id,
        content,
      })
    )
      .unwrap()
      .then(() => setContent(""))
      .catch(() => toast.error("Failed to add comment"));
  };

  return (
    <div className="space-y-4">
      {/* Add comment */}
      <div className="bg-card rounded-md flex items-center gap-3 p-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onInput={(e) => {
            const target = e.currentTarget;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
          rows={1}
          placeholder="Add a comment..."
          className="flex-1 resize-none bg-transparent text-sm text-gray-800
               placeholder-gray-500 focus:outline-none"
        />

        <button
          onClick={withAuth(handleAddComment)}
          disabled={addLoading || !content.trim()}
          className={`text-sm font-semibold
          ${
            content.trim()
              ? "text-green-800 hover:text-green"
              : "text-green cursor-default"
          }`}>
          {addLoading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* Comments */}
      <InfiniteScroll
        className="space-y-3"
        loading={loading}
        hasMore={hasMore}
        list={comments}
        onLoadMore={() =>
          dispatch(
            loadComments({
              postId,
              page: page + 1,
              size: PAGE_SIZE,
            })
          )
        }
        loader={Array.from({ length: 10 }).map((_, i) => (
          <CommentSkeleton key={i} />
        ))}
        emptyMessage={
          <p className="text-xs text-gray-500 text-center py-4">
            No comments yet. Be the first to comment.
          </p>
        }>
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            {/* Avatar */}
            <img
              src={getUserImageSrc(comment.authorImage)}
              alt={comment.author}
              className="w-8 h-8 rounded-full object-cover"
            />

            {/* Comment body */}
            <div className="flex-1 text-sm leading-snug">
              <div>
                <span className="font-semibold text-gray-900 mr-1">
                  {comment.author}
                </span>
                <span className="text-gray-800">{comment.content}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-1 text-[11px] text-gray-500">
                <span>{formatTimeAgo(comment.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CommentsList;
