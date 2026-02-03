import BorderDots from "../ui/BorderDots";
import AutoResizeTextarea from "../ui/AutoResizeTextarea";
import { getUserImageSrc } from "@/utils/imageUtils";

type ViewPoemCardProps = {
  title?: string;
  username: string;
  poemContent: string;
  authorImage?: string;
  handleApprove: () => void;
};

const ViewPoemCard: React.FC<ViewPoemCardProps> = ({
  title,
  username,
  poemContent,
  authorImage,
  handleApprove,
}) => {
  return (
    <div className="relative rounded-lg !border-4 border-primary bg-secondary p-6 overflow-hidden">
      <BorderDots />
      <div className="pt-2 text-center">
        {title && <h2 className="mb-2 text-xl text-[#e8dcc8]">{title}</h2>}

        <div className="mb-2 flex items-center justify-center gap-2">
          <img
            src={getUserImageSrc(authorImage ?? "")}
            alt={username}
            className="w-6 h-6 rounded-full object-cover"
          />
          <p className="text-sm text-[#a8c4c2]">{username}</p>
        </div>

        <AutoResizeTextarea
          className="mb-2 w-full text-center text-sm text-[#e8dcc8]"
          value={poemContent}
          readOnly
        />

        <button
          onClick={handleApprove}
          className="px-3 h-6 bg-highlight rounded-full cursor-pointer text-sm outline-none">
          View Poem
        </button>
      </div>
    </div>
  );
};

export default ViewPoemCard;
