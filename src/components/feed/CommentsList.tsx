"use client";

import { RootState, useAppDispatch } from "@/store";
import { addComment, loadComments } from "@/store/comments";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePlayerDetails } from "@/utils/UserSession";
import { toast } from "react-toastify";
import { getUserImageSrc } from "@/utils/imageUtils";
import Loader from "../ui/Loader";
import { formatTimeAgo } from "@/utils";

type Props = {
  postId: number;
};

const CommentsList = ({ postId }: Props) => {
  const [content, setContent] = useState("");

  const { comments, loading, addLoading } = useSelector(
    (state: RootState) => state.comments
  );

  const dispatch = useAppDispatch();
  const { playerDetails } = usePlayerDetails();

  useEffect(() => {
    dispatch(loadComments({ postId }));
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

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Loader />
      </div>
    );
  }

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
          onClick={handleAddComment}
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
      <div className="space-y-3">
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

        {comments.length === 0 && (
          <p className="text-xs text-gray-500 text-center py-4">
            No comments yet. Be the first to comment.
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsList;
