import { useState} from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CommentsList } from "./CommentsList";

type Comment = {
  name: string;
  text: string;
  image: string;
};

type Poem = {
  title: string;
  author: string;
  image: string;
  comments?: Comment[];
};

type PoemCommentsListProps = {
  poems: Poem[];
  onSelectPoem: (poem: Poem) => void;
  selectedPoem?: Poem;
};

export default function PoemCommentsList({
  poems,
  onSelectPoem,
  selectedPoem,
}: PoemCommentsListProps) {
  const [commentsVisible, setCommentsVisible] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {poems.map((poem) => (
        <div
          key={poem.title}
          onClick={() => onSelectPoem(poem)}
          className={`cursor-pointer bg-[#f8f5e4] px-4 py-3 rounded-lg shadow-md flex items-center gap-4 
            hover:bg-[#e7e1c7] transition
            ${
              selectedPoem?.title === poem.title
                ? "border-2 border-[#d4a574]"
                : ""
            }`}>
          <img
            src={poem.image}
            alt={poem.author}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <span className="font-semibold text-gray-600">{poem.title}</span>
            <span className="text-[#6a7a78] text-xs">{poem.author}</span>
            {poem.comments && (
              <span className="text-xs text-[#6a7a78] mt-1">
                Comments ({poem.comments.length})
              </span>
            )}
          </div>

          <div className="ml-auto w-5 h-5 flex items-center justify-center rounded-full bg-[#e7e1c7]">
            <svg
              className="h-3 w-3 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </div>
        </div>
      ))}

      {selectedPoem && (
        <div className="rounded-lg shadow-md overflow-hidden">
          <div
            className="cursor-pointer w-full flex items-center justify-between bg-[#f8f5e4] px-4 py-3 transition"
            onClick={() => setCommentsVisible((v) => !v)}>
            <div className="flex items-center gap-2">
              <img
                src={selectedPoem.image}
                alt={selectedPoem.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-600">
                Comments ({selectedPoem.comments?.length || 0})
              </span>
            </div>

            <motion.div
              animate={{ rotate: commentsVisible ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 bg-[#e7e1c7] rounded-full flex items-center justify-center">
              <ChevronDown className="w-3 h-3 text-gray-600" />
            </motion.div>
          </div>

          {commentsVisible && selectedPoem.comments && (
            <CommentsList comments={selectedPoem.comments} />
          )}
        </div>
      )}
    </div>
  );
}
