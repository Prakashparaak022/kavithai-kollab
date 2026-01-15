import { UserRoundPlusIcon } from "lucide-react";
import BorderDots from "../ui/BorderDots";

type PoemCardProps = {
  title: string;
  username: string;
  content: string;
  onInvite: () => void;
};

const PoemDetailCard: React.FC<PoemCardProps> = ({
  title,
  username,
  content,
  onInvite,
}) => {
  return (
    <div className="relative rounded-lg border-4 border-[#d4a574] bg-secondary p-6 overflow-hidden">
      <button
        onClick={onInvite}
        className="absolute right-6 flex items-center gap-1 px-3 h-8 bg-highlight rounded-full cursor-pointer outline-none">
        Invite <UserRoundPlusIcon size={15} />
      </button>
      {/* border design */}
      <BorderDots />
      {/* Content */}
      <div className="pt-2 text-center">
        <h2 className="mb-1 text-xl text-[#e8dcc8]">{title}</h2>
        <p className="mb-3 text-sm text-[#a8c4c2]">{username}</p>
        <p className="text-sm text-[#e8dcc8]">{content}</p>
      </div>
    </div>
  );
};

export default PoemDetailCard;
