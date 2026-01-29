import { getBase64ImageSrc } from "@/utils/imageUtils";
import BorderDots from "../ui/BorderDots";

type ApproveCardProps = {
  title?: string;
  poemContent: string;
  collabContent: string;
  imageUrl?: string;
  handleApprove: () => void;
};

const CollabApproveCard: React.FC<ApproveCardProps> = ({
  title,
  poemContent,
  collabContent,
  imageUrl,
  handleApprove,
}) => {
  return (
    <div className="relative rounded-lg !border-4 border-primary bg-secondary p-6 overflow-hidden">
      <BorderDots />

      {imageUrl && (
        <div className="flex justify-center">
          <img
            src={getBase64ImageSrc(imageUrl)}
            alt={title}
            className="h-40 w-40 object-cover rounded-full border-2 border-[var(--border-primary)]"
          />
        </div>
      )}

      <div className="pt-2 text-center">
        <h2 className="mb-1 text-xl text-[#e8dcc8]">{title}</h2>
        <p className="mb-3 text-sm text-[#a8c4c2]">{poemContent}</p>
        <p className="text-sm text-[#e8dcc8]">{collabContent}</p>
        <button
          onClick={handleApprove}
          className="px-3 h-8 bg-highlight rounded-full cursor-pointer outline-none">
          Confirm Approve
        </button>
      </div>
    </div>
  );
};

export default CollabApproveCard;
