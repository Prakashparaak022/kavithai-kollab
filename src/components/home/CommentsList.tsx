import { Heart } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export type CommentItem = {
  name: string;
  text: string;
  image: string;
};

type CommentsListProps = {
  comments?: CommentItem[];
};

type HeartPosition = {
  x: number;
  y: number;
  id: string;
  offsetX: number;
};

export function CommentsList({ comments }: CommentsListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [hearts, setHearts] = useState<HeartPosition[]>([]);

  if (!comments || comments.length === 0) return null;

  const handleLike = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = event.currentTarget.getBoundingClientRect();

    const x = targetRect.left - containerRect.left + targetRect.width / 2;
    const y = targetRect.top - containerRect.top + targetRect.height / 2;

    setHearts((prev) => {
      const id = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      const offsetX = Math.random() * 30 - 15;
      return [...prev, { x, y, id, offsetX }];
    });

    setLiked((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== `${Date.now()}-${Math.floor(Math.random() * 1000000)}`));
    }, 800);
  };

  return (
    <div ref={containerRef} className="flex flex-col bg-[#f8f5e4] relative overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{ top: heart.y - 12, left: heart.x - 12 }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.6, y: -35, x: heart.offsetX }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Heart fill="currentColor" className="text-pink-400 w-6 h-6" />
        </motion.div>
      ))}

      {comments.map((comment, idx) => (
        <div key={`${comment.name}-${idx}`} className="p-3 flex items-center justify-between">
          <div className="flex gap-4">
            <img src={comment.image} alt={comment.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700 text-sm">{comment.name}</span>
              <span className="text-sm text-[#6a7a78]">{comment.text}</span>
            </div>
          </div>

          <motion.div
            onClick={(e) => handleLike(idx, e)}
            whileTap={{ scale: 1.3 }}
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer"
          >
            <Heart
              fill={liked.has(idx) ? "currentColor" : "none"}
              className={`w-5 h-5 transition ${liked.has(idx) ? "text-pink-500" : "text-pink-400"}`}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
