"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePlayerDetails } from "@/utils/UserSession";
import { useModal } from "@/context/ModalContext";
import { Comment } from "@/types/poem";
import useRequireAuth from "@/hooks/useRequireAuth";

type Props = {
  comments: Comment[];
};

const Comments = ({ comments }: Props) => {
  const [selectedComment, setSelectedComment] = useState<number | null>(null);
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [showInput, setShowInput] = useState(false);
  const [newComment, setNewComment] = useState("");

  const { playerDetails } = usePlayerDetails();
  const { withAuth } = useRequireAuth();

  const toggleComment = (id: number) => {
    setSelectedComment((prev) => (prev === id ? null : id));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      name: `@${playerDetails?.userName}`,
      content: newComment,
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    };

    setCommentList((prev) => [comment, ...prev]);
    setNewComment("");
    setShowInput(false);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-green">
        Comments ({commentList.length})
      </h3>

      {commentList.map((comment) => {
        const isOpen = selectedComment === comment.id;

        return (
          <div
            key={comment.id}
            onClick={() => toggleComment(comment.id)}
            className="p-3 rounded-xl bg-[#f8f5e4] cursor-pointer
                       hover:shadow-md transition-shadow">
            <div className="flex gap-3">
              <img
                src={comment.imageUrl}
                alt={comment.name}
                className="w-9 h-9 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">
                    {comment.name}
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

      {/* ADD COMMENT */}
      <div className="p-3 rounded-xl bg-[#f8f5e4]">
        {!showInput ? (
          <button
            onClick={withAuth(() => setShowInput(true))}
            className="text-sm text-blue-600 hover:underline">
            + Add a comment
          </button>
        ) : (
          <div className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              placeholder="Write your comment..."
              className="w-full text-sm  text-gray-700 p-3 rounded-md
                         border border-gray-300 focus:outline-none
                         focus:ring-1 focus:ring-green-700"
            />

            <div className="flex gap-2">
              <button
                onClick={handleAddComment}
                className="px-4 py-1.5 text-sm rounded-md
                           bg-secondary text-white">
                Submit
              </button>

              <button
                onClick={() => {
                  setShowInput(false);
                  setNewComment("");
                }}
                className="px-4 py-1.5 text-sm rounded-md
                           bg-highlight text-white">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
