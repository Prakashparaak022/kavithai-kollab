import { ApiPoem } from "@/types/api";
import { Heart, MessageCircle } from "lucide-react";

type Props = {
  poem: ApiPoem;
  onLike: (id: number, isLiked: boolean) => void;
  onComment: (id: number) => void;
};

const PoemCardActions = ({ poem, onLike, onComment }: Props) => {
  return (
    <div className="mt-auto flex items-center justify-between text-gray-500">
      <button
        onClick={(e) => {
          e.preventDefault();
          onLike(poem.id, poem.isLiked);
        }}
        className={`flex items-center gap-1 text-xs transition ${
          poem.isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
        }`}>
        <Heart size={16} fill={poem.isLiked ? "currentColor" : "none"} />
        {poem.likesCount}
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          if (poem.isPrivate) return;
          onComment(poem.id);
        }}
        className="flex items-center gap-1 text-xs hover:text-blue-500 transition">
        <MessageCircle size={16} />
        {poem.commentsCount}
      </button>
    </div>
  );
};

export default PoemCardActions;
