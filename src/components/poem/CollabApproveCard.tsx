"use client"
import { useState } from "react";
import BorderDots from "../ui/BorderDots";
import AutoResizeTextarea from "../ui/AutoResizeTextarea";

type ApproveCardProps = {
  title?: string;
  poemContent: string;
  collabContent?: string;
  handleApprove: (updatedContent: string) => void;
};

const CollabApproveCard: React.FC<ApproveCardProps> = ({
  title,
  poemContent,
  collabContent,
  handleApprove,
}) => {
  const [editedPoemContent, setEditedPoemContent] = useState(
    `${poemContent}\n${collabContent}`
  );

  const handleApproveClick = () => {
    handleApprove(editedPoemContent);
  };

  return (
    <div className="relative rounded-lg !border-4 border-primary bg-secondary p-6 overflow-hidden">
      <BorderDots />

      <div className="pt-2 text-center">
        <h2 className="mb-4 text-xl text-[#e8dcc8]">{title}</h2>

        {/* Textarea */}
        <AutoResizeTextarea
          className="mb-3 text-sm text-center text-[#a8c4c2] bg-transparent w-full"
          value={editedPoemContent}
          onChange={(e) => setEditedPoemContent(e.target.value)}
        />

        {/* Confirm button */}
        <button
          onClick={handleApproveClick}
          className="px-3 h-6 bg-highlight rounded-full cursor-pointer text-sm outline-none">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CollabApproveCard;
