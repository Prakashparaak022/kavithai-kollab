import { getBase64ImageSrc } from "@/utils/imageUtils";
import BorderDots from "../ui/BorderDots";
import AutoResizeTextarea from "../ui/AutoResizeTextarea";

type PoemCardProps = {
  title: string;
  username: string;
  content: string;
  imageUrl?: string;
};

const PoemDetailCard: React.FC<PoemCardProps> = ({
  title,
  username,
  content,
  imageUrl,
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
        <p className="mb-2 text-sm text-[#a8c4c2]">{username}</p>
        <AutoResizeTextarea
          className="w-full text-center text-sm text-[#e8dcc8]"
          value={content}
          readOnly
        />
      </div>
    </div>
  );
};

export default PoemDetailCard;
