"use client";
import { motion } from "framer-motion";

import { RootState, useAppDispatch } from "@/store";
import { addComment, loadComments } from "@/store/comments";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";
import { usePlayerDetails } from "@/utils/UserSession";
import { toast } from "react-toastify";
import { getUserImageSrc } from "@/utils/imageUtils";

type Props = {
  postId: number;
};

const CommentsList = ({ postId }: Props) => {
  const [content, setContent] = useState("");
  const [selectedComment, setSelectedComment] = useState<number | null>(null);
  const { comments, addLoading } = useSelector(
    (state: RootState) => state.comments
  );
  const dispatch = useAppDispatch();
  const { playerDetails } = usePlayerDetails();

  useEffect(() => {
    if (!comments.length) {
      dispatch(loadComments({ postId: 29 }));
    }
  }, [dispatch, comments.length]);

  const toggleComment = (id: number) => {
    setSelectedComment((prev) => (prev === id ? null : id));
  };

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
      .then(() => {
        setContent("");
      })
      .catch(() => {
        toast.error("Failed to add comment");
      });
  };

  return (
    <div className="space-y-3">
      <div className="">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="Write your line..."
          className="w-full text-sm text-gray-800 p-3 rounded-md border-primary !border-2 focus:!border-green-800 focus:outline-none"
        />

        <div className="flex gap-2">
          <button
            disabled={addLoading}
            onClick={handleAddComment}
            className="px-4 py-1.5 text-sm rounded-md
                     bg-secondary text-white">
            {addLoading ? "Posting..." : "Submit"}
          </button>

          <button
            onClick={() => {
              setContent("");
            }}
            className="px-4 py-1.5 text-sm rounded-md
                     bg-highlight text-white">
            Cancel
          </button>
        </div>
      </div>

      {comments.map((comment) => {
        const isOpen = selectedComment === comment.id;

        return (
          <div
            key={comment.id}
            onClick={() => toggleComment(comment.id)}
            className="p-3 rounded-xl bg-card cursor-pointer
                       hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <img
                src={getUserImageSrc(comment.authorImage)}
                alt={comment.author}
                className="w-9 h-9 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">
                    {comment.author}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-6 bg-[#e7e1c7] rounded-full
                               flex items-center justify-center">
                    <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                  </motion.div>
                </div>

                <motion.p
                  initial={false}
                  className={`text-sm text-gray-700 mt-1
                    ${isOpen ? "" : "line-clamp-2"}`}>
                  {comment.content}
                </motion.p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
